/**
 * @jsx React.DOM
 */

var React = require('react');
var Link = require('react-router').Link;
var store = require('../public/js/store.js');
var TreeNode = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
    },

    render: function() {
        var item = this.props;
        var link;
        if(item.url){
           link = <Link to="result" params={{splat: item.url}}>{item.name}</Link>;
        }else{
           link = <a onClick={this.loadChildren}>{item.name}</a>;
        }            
        return (
            <li>
               <img src={'/img/type-' + item.type + '.png'} title={item.type} className="ry-type.source"/>
               {link}
               <span className='cursive'>{item.len>0?'('+item.len+')':''}</span>
               <ul>
                    {this.state.data}
               </ul>
            </li>
        );
    },

    loadChildren: function(){
        if(this.props.type==='docset'){
            store.get('type', {docset: this.props.name})
                .then(function(types){
                    var treenodes = [];
                    types.forEach(function(type){
                        treenodes.push(<TreeNode key={type} type={type} name={type} docset={this.props.name}/>);
                    }.bind(this));
                    this.setState({data: treenodes});
                }.bind(this));
        }else{
             store.get('reference', {docset: this.props.docset, type: this.props.name})
                .then(function(references){
                    var treenodes = [];
                    //TODO
                    references.forEach(function(ref){
                        treenodes.push(<TreeNode key={ref.reference} type={ref.type} name={ref.reference} 
                            url={ref.uri.substring(1,ref.uri.length)}/>);
                    });
                    this.setState({data: treenodes});
                }.bind(this));
        }
    }
});

module.exports = TreeNode;
