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
               <img src={'/img/type-' + item.type + '.png'} title={item.type} className="ry-type-source"/>
               {link}
               <span className='cursive'>{item.len>0?'('+item.len+')':''}</span>
               <ul>
                    {this.state.data}
               </ul>
            </li>
        );
    },

    loadChildren: function(){

        this.props.config.loadData(this.props.config.innerLevel, this.props.parents)
            .then(function(treenodes){
                   this.setState({data: treenodes});
                }.bind(this));
    }
});

module.exports = TreeNode;
