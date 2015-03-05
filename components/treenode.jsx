/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var TreeNode = React.createClass({
    HIDE_CLASS: 'hide',
    SHOW_CLASS:'show',
    CHECKED_CLASS: 'checked',
	SELECTED_CLASS: 'selected',

    getInitialState: function() {
        return {
            data: [],
            show: false
        };
    },

    onClickHandler: function(){
        var item = this.props;
       docset = (item.type==='docset')?item.uri.substr(1,item.uri.lastIndexOf('/')-1):item.docset;
       uri = (item.type==='docset')?item.uri.substr(item.uri.lastIndexOf('/')+1):item.uri;
       this.props.onClickHandler({docset: docset, splat: uri});
    },

    render: function() {
        var item = this.props;
        var link;
		var classname = '';
        if(item.uri){
           if(item.type=='docset'){
               link = <a onClick={function(){this.show(); this.onClickHandler()}.bind(this)}>{item.name}</a>;
           }else{
               link = <a onClick={this.onClickHandler} className={'type-icon type-'+item.type}>{item.name}</a>;
           }
        }else{
           link = <a onClick={this.show} className={'type-icon type-'+item.type}>{item.name}</a>;
        }
		if(this.state.show)
			classname = this.CHECKED_CLASS;

		if(this.props.selected && this.props.selected.uri === item.uri && this.props.selected.docset === item.docset)
				classname = this.SELECTED_CLASS;
		
		var data = this.state.data.map(function(d){			
			d.props.selected = this.props.selected;	
			return d;	
		}.bind(this));
        return (
            <li className={classname} >
               {item.uri?'':<a onClick={this.show}><div className='list-arrow'></div></a>}
               {item.type==='docset'?<span onClick={this.show} className={"docset-icon docsets-" + item.name }></span>:''}
               {link}
               <span className='cursive'>{item.len>0?'('+item.len+')':''}</span>
               <ul className={this.state.show?this.SHOW_CLASS:this.HIDE_CLASS}>
                    {data}
               </ul>
            </li>
        );
    },

    show: function(){
        if(this.state.data.length>0){
            this.setState({show: !this.state.show});
        }else{
            this.props.config
                .loadData(this.props.config.innerLevel, this.props.parents, this.props.onClickHandler)
                .then(function(treenodes){
                        this.setState({data: treenodes, show: !this.state.show});
                    }.bind(this));
        }
    }
});

module.exports = TreeNode;
