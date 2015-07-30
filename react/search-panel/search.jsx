var React = require('react');
var SearchResultRow = require('./search_result_row.jsx');
var store = require('./store.js');
var actions = require('./actions.js');
var SettingsButton = require('../settings/settings-button.jsx');
var InfiniteScroll = require('react-infinite-scroll')(React);
var Reflux = require('reflux');
var DbPromise = require('../infrastructure/debounce-promise.js');
var Mousetrap = require('mousetrap');
var NOT_FOUND = 'Reference not found!', LOADING = 'Loading...';

module.exports = React.createClass({
    getInitialState: function() {
        return {data: {results: [], reached_end:true, docset:null}, message:'', current_index: -1};
    },
    
    getDefaultProps: function() {
        return {
            search: ''
        };
      },

    render: function(){
       var docset = '';
       var selectorclass = '';
       if(this.state.data.docset!=null){
           selectorclass = 'input-search-selector';
           docset = (<span className="docset-selector"><span className={"docset-icon docsets-" + this.state.data.docset.name.replace(' ', '-')}></span></span>);
       }

       var result_rows = this.state.data.results.map(function(r,index){
                    if(this.state.current_index==index)
                        r.marked = true;
                    else
                        r.marked = false;
                    return <SearchResultRow result_index={index} key={'SRR' + r.docset + r.ref_uri} onClick={this.onClickHandler}
	                reference={r.name} marked={r.marked} type={r.type} docset={r.docset_name} uri={r.uri}/>
                }.bind(this));
       var content;
       if(result_rows.length>0){
           content = <InfiniteScroll pageStart={1} className='list-group' loadMore={this.search} hasMore={this._hasMore()} container='search-results' loader={<span className="alert alert-info" role="alert">{LOADING}</span>}>
                        {result_rows}
                    </InfiniteScroll>;
        }else{
            content = this.state.message?<div className="alert alert-info" role="alert">{this.state.message}</div>:undefined;
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

    onClickHandler: function(uri){
        loadReference(uri);
    },

    _hasMore: function(){
        return this.pattern && !this.state.data.reached_end;
    },

    componentWillMount: function(){
        this.dbpromise = new DbPromise(800);
        this.mousetrap = new Mousetrap(document.documentElement);
        this.characterlist = new Array('A','B','C','D','E','F','G','H','I','J','Q','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z',
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z',
            '1','2','3','4','5','6','7','8','9','0',
            '\\','!','"','·','$','%','&','/','(',')',
            '.',',','=',"'",'^','*','[',']','ç','+','-','_','?','¿','¡','^','{','}');
        this.unsubscribe = store.listen(this.storeUpdated);
    },

    componentWillUnmount: function(){
        window.removeEventListener('resize', this.calculateHeight, false);
        this.unsubscribe();
    },

    componentDidUpdate: function(){
        if(this.state.data.results.length>0 && this.state.current_index<this.state.data.results.length && this.state.current_index>-1){
            $("#search-results").scrollTop($("#result-"+ this.state.current_index).offset().top - $("#result-0").offset().top - 40);
        }
    },

    componentDidMount: function(){
        window.addEventListener('resize', this.calculateHeight, false);
        this.calculateHeight();

        this.pattern = this.props.search;
		var search_box = this.refs.searchbox.getDOMNode('#txtreference');

        search_box.value = this.props.search;
        $(search_box).next('span').toggle(Boolean(this.props.search));
        this.mousetrap.bind(this.characterlist,function(e){
            if(e.target.className.indexOf('focusable')==-1){
                search_box.focus();
            }
        });
        this.mousetrap.bind('tab',function(e){
            var search_box = this.refs.searchbox.getDOMNode('#txtreference');
            if(search_box.value!='' && document.activeElement == search_box){
                e.preventDefault();
                this.lookForDocset(search_box.value);
                search_box.value = '';
                search_box.focus();
            }
        }.bind(this));
        this.mousetrap.bind('backspace',function(e){
            var search_box = this.refs.searchbox.getDOMNode('#txtreference');
            if(search_box.value=='' && document.activeElement == search_box){
                this.lookForDocset(null);
            }
        }.bind(this));
        this.mousetrap.bind('down',function(e){
            if(this.state.data.results.length>0){
                if(this.state.current_index>=this.state.data.results.length)
                    var current_index = this.state.data.results.length-1;
                else
                    var current_index = this.state.current_index + 1;
                this.setState({current_index: current_index});
            }
        }.bind(this));
        this.mousetrap.bind('up',function(e){
            if(this.state.data.results.length>0){
                if(this.state.current_index<-1)
                    var current_index = -1;
                else
                    var current_index = this.state.current_index - 1;
                this.setState({current_index: current_index});
            }
        }.bind(this));
        this.mousetrap.bind('enter',function(e){
            if(this.state.data.results[this.state.current_index]!= undefined){
                var uri = this.state.data.results[this.state.current_index].uri;
                this.loadReference(uri);
            }

        }.bind(this));

        if(this.pattern)
            this.search(1);
    },

    loadReference: function(uri){
        actions.markReference(uri);
        dataLayer.push({'event': 'found', 'patternSearched': this.pattern});
        this.props.onClick(uri, true);
    },
    lookForDocset: function(txtdocset){
        actions.searchDocset(txtdocset);
    },

    calculateHeight: function(){
        var footer = (window.document.body.clientWidth<768?44:0);
        this.refs['search-results'].getDOMNode().style['max-height'] = window.document.body.clientHeight - footer - 108 +'px';        
    },

    storeUpdated: function(data){
        var message = '';
        if(data.results.length === 0){
            message = NOT_FOUND;
        }

        this.setState({'data': data, 'message': message});
    },

    emptySearch: function(){
        $(this.refs.searchbox.getDOMNode('#txtreference')).val('').focus();
        $(this.refs.searchbox.getDOMNode('#txtreference')).next('span').hide();
        this.props.onKeyUpEvent({target:{value: ''}});
        this.cleanResults();
    },

    onKeyUp: function(event){
		event.persist();
        var notdebounce_characters = [13, 37, 38, 39, 40];
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
        }
    },

    cleanResults: function(){
        this.setState({data:{results:[], reached_end:true, docset: this.state.data.docset}, message: '', current_index: -1});
    },

	search: function(page){
        if(page===1)
            this.setState({data:{results:[], reached_end:true, docset: this.state.data.docset}, message: LOADING, current_index: -1});
        actions.searchReference(this.pattern, page);
	},
});
