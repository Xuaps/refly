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
        if(item.uri){
           link = <Link to="result" params={{docset:item.docset, splat: item.uri}}>{item.name}</Link>;
        }else{
           link = <a onClick={this.show}>{item.name}</a>;
        }            
        return (
            <li>
               <img src={'/img/languages/' + item.name + '-logo.png'} title={item.name} className="ry-language-source"/>
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
