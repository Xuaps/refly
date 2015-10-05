var React = require('react');
var SearchResultRow = require('./search_result_row.jsx');
var store = require('./store.js');
var actions = require('./actions.js');
var SettingsButton = require('../settings/settings-button.jsx');
var InfiniteScroll = require('react-infinite-scroll')(React);
var Reflux = require('reflux');
var DbPromise = require('../infrastructure/debounce-promise.js');
var Mousetrap = require('mousetrap');
var LOADING = 'Loading...';

module.exports = React.createClass({
    mixins: [Reflux.connect(store, 'data')],

    componentWillMount: function(){
        this.current_index = 0;
        this.dbpromise = new DbPromise(800);
        this.mousetrap = new Mousetrap(document.documentElement);
        this.characterlist = new Array('A','B','C','D','E','F','G','H','I','J','Q','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z',
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z',
            '1','2','3','4','5','6','7','8','9','0',
            '\\','!','"','·','$','%','&','/','(',')',
            '.',',','=',"'",'^','*','[',']','ç','+','-','_','?','¿','¡','^','{','}');
    },

    componentDidMount: function(){
        this.bindKeys();
        window.addEventListener('resize', this.calculateHeight, false);
        this.calculateHeight();
        this.pattern = this.props.search;
		var search_box = this.refs.searchbox.getDOMNode('#txtreference');

        search_box.value = this.props.search || '';
        $(search_box).next('span').toggle(Boolean(this.props.search));
        this.mousetrap.bind(this.characterlist,function(e){
            if(e.target.className.indexOf('focusable')==-1){
                search_box.focus();
            }
        });

        if(this.pattern)
            this.search(1);
    },

    componentDidUpdate: function(){
        this.calculateHeight();
    },

    shouldComponentUpdate: function(nextProps, nextState) {
      return nextState.message !== this.state.message || nextState.data !== this.state.data;                         
    },

    render: function(){
       var content = '';

       if(this.state.data){
           var docset = '';
           var selectorclass = '';
           if(this.state.data.get('docset')){
               selectorclass = 'input-search-selector';
               docset = (<span className="docset-selector"><span className={"docset-icon docsets-" + this.state.data.get('docset').name.replace(' ', '-')}></span></span>);
           }

           var result_rows = this.state.data.get('results').map(function(r,index){
                                 return this.buildRow(r, index);
                             }.bind(this));
           if(result_rows.count()>0){
               content = <InfiniteScroll pageStart={1} className='list-group' loadMore={this.search} hasMore={this._hasMore()} container='search-results' loader={<span className="alert alert-info" role="alert">{LOADING}</span>}>
                            {result_rows}
                        </InfiniteScroll>;
            }else{
                content = this.state.data.get('message')?<div className="alert alert-info" role="alert">{this.state.data.get('message')}</div>:undefined;
            }
       }

       return(
                <div>
                    <div className="input-group has-feedback">
                      {docset}
                      <input id="txtreference" ref="searchbox" type="text" className={'form-control ' + selectorclass} placeholder="Search for..." onKeyUp={this.onKeyUp} aria-describedby="basic-addon1" />
                      <span className="clearer glyphicon glyphicon-remove-circle form-control-feedback searchref-icon-clean" onClick={this.emptySearch}></span>
                      <span className="input-group-addon btn-setting-container"><SettingsButton ref="settingsbutton"></SettingsButton></span>
                    </div>
                    <div id="search-results" ref='search-results'>
                        {content}
                    </div>
                </div>
        );
    },

    componentWillUnmount: function(){
        this.unbindKeys();
        window.removeEventListener('resize', this.calculateHeight, false);
    },

    buildRow: function(r, index){
        return <SearchResultRow result_index={index} key={'SRR' + r.docset + r.ref_uri} onClickResult={this.loadReference.bind(this, r.uri, index)}
                    reference={r.name} type={r.type} docset={r.docset_name} uri={r.uri}/>
    },

    onKeyUp: function(event){
		event.persist();
        var notdebounce_characters = [13, 37, 38, 39, 40, 9];
        if(notdebounce_characters.indexOf(event.keyCode)==-1){
            $(event.target).next('span').toggle(Boolean(event.target.value));
            this.dbpromise.debounce().then(function () {
                this.props.onKeyUpEvent(event);
                if(!event.target.value){
                    this.cleanResults();
                }else{
                    this.pattern = event.target.value;
                    dataLayer.push({'event': 'search', 'patternSearched': this.pattern});
                    this.search(1);
                }

            }.bind(this)).done();
        }else{
            this.props.onKeyUpEvent(event);
        }
    },

    _hasMore: function(){
        return this.pattern && !this.state.data.get('reached_end');
    },

    loadReference: function(uri, index){
        this.selectReference(index);
        dataLayer.push({'event': 'found', 'patternSearched': this.pattern});
        this.props.onClick(uri, true);
    },

    selectReference: function(index){
        this.current_index = index || this.current_index;
        $(".loaded").toggleClass('loaded');
        $("#result-"+ this.current_index).toggleClass('loaded');
        this.updateScroll();
     },
    calculateHeight: function(){
        var footer = (window.document.body.clientWidth<768?44:0);
        this.refs['search-results'].getDOMNode().style['max-height'] = window.document.body.clientHeight - footer - 108 +'px';        
    },

    emptySearch: function(){
        $(this.refs.searchbox.getDOMNode('#txtreference')).val('').focus();
        $(this.refs.searchbox.getDOMNode('#txtreference')).next('span').hide();
        this.props.onKeyUpEvent({target:{value: ''}});
        this.cleanResults();
    },

    updateScroll: function(){
        if(this.state.data.get('results').count()>0 && this.current_index<this.state.data.get('results').count() && this.current_index>-1)
            $("#search-results").scrollTop($("#result-"+ this.current_index).offset().top - $("#result-0").offset().top - 40);
    },

    cleanResults: function(){
        actions.init(this.state.data.get('docset'));
    },

	search: function(page){
        if(page===1 && this.state.data)
            actions.init(this.state.data.get('docset'));
        actions.searchReference(this.pattern, page);
	},

    //functions launched by keys
    selectResult: function(){
        if(this.state.data && this.state.data.get('results').get(this.current_index)!= undefined && this.props.searchVisible){
            var uri = this.state.data.get('results').get(this.current_index).uri;
            this.loadReference(uri);
        }
    },

    cleanSelectedDocset: function(){
        var search_box = this.refs.searchbox.getDOMNode('#txtreference');
        if(search_box.value=='' && document.activeElement == search_box){
            actions.searchDocset(null);
        }
    },

    selectDocset: function(){
        var search_box = this.refs.searchbox.getDOMNode('#txtreference');
        if(search_box.value!='' && document.activeElement == search_box){
            actions.searchDocset(search_box.value);
            search_box.value = '';
            search_box.focus();
        }
    },

    markReference: function(direction){
        if(this.state.data){
            if(direction === 'UP'){
                this.current_index = Math.max(0,this.current_index - 1);
            }else{
                this.current_index = Math.min(this.state.data.get('results').count()-1, this.current_index + 1);
            }
            $(".selected").toggleClass('selected');
            $("#result-"+ this.current_index).toggleClass('selected');
            this.updateScroll();
        }
     },

    unbindKeys: function(){
        this.mousetrap.unbind('tab');
        this.mousetrap.unbind('backspace');
        this.mousetrap.unbind(['enter', 'right']);
        this.mousetrap.unbind('down');
        this.mousetrap.unbind('up'); 
    },

    bindKeys: function(){
        this.mousetrap.bind('tab',function(e){
            dataLayer.push({'event': 'specific'});
            e.preventDefault();
            this.selectDocset();
        }.bind(this));
        this.mousetrap.bind('backspace',function(e){
            this.cleanSelectedDocset();
        }.bind(this));
        this.mousetrap.bind('down',function(e){
            e.preventDefault();
            this.markReference('DOWN');
        }.bind(this));
        this.mousetrap.bind('up',function(e){
            e.preventDefault();
            this.markReference('UP');
        }.bind(this));
        this.mousetrap.bind(['enter', 'right'],function(e){
            e.preventDefault();
            this.selectResult();
        }.bind(this));
    },

});
