/**
 * @jsx React.DOM
 */

var React = require('react');
var Link = require('react-router').Link;
var store = require('../public/js/store.js');
var TreeNode = React.createClass({
    HIDE_CLASS: 'hide',
    SHOW_CLASS:'show',

    getInitialState: function() {
        return {
            data: [],
            show: false
        };
    },

    render: function() {
        var item = this.props;
        var link;
        if(item.url){
           link = <Link to="result" params={{splat: item.url}}>{item.name}</Link>;
        }else{
           link = <a onClick={this.show}>{item.name}</a>;
        }            
        return (
            <li>
               <img src={'/img/type-' + item.type + '.png'} title={item.type} className="ry-type-source"/>
               {link}
               <span className='cursive'>{item.len>0?'('+item.len+')':''}</span>
               <ul className={this.state.show?this.SHOW_CLASS:this.HIDE_CLASS}>
                    {this.state.data}
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
