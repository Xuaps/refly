/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
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

    render: function() {
        var item = this.props;
        var link;
		var classname = '';
        if(item.uri){
           if(item.type=='docset'){
               docset = item.uri.substr(1,item.uri.lastIndexOf('/')-1);
               uri = item.uri.substr(item.uri.lastIndexOf('/')+1);
               link = <Link onClick={this.show} to="result" key={'TL' + item.uri} params={{docset: docset, splat: uri}}>{item.name}</Link>;
           }else{
               link = <Link to="result" className={'type-icon type-'+item.type} key={'TL' + item.uri} params={{docset:item.docset, splat: item.uri}}>{item.name}</Link>;
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
                .loadData(this.props.config.innerLevel, this.props.parents)
                .then(function(treenodes){
                        this.setState({data: treenodes, show: !this.state.show});
                    }.bind(this));
        }
    }
});

module.exports = TreeNode;
