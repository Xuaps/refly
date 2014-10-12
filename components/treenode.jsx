/**
 * @jsx React.DOM
 */

var React = require('react');
var Link = require('react-router').Link;
var TreeView = require('./treeview.jsx');
var TreeNode = React.createClass({
    getInitialState: function() {
        return {
            children: [] 
        };
    },
    loadChildren: function(){
        children= [
                <TreeNode key='a' type='docset' uri= '' reference='javascript' len='10'/>,
                <TreeNode key='b' type='docset' uri= '' reference='javascript' len='9'/>,
                <TreeNode key='c' type='docset' uri= '' reference='javascript' len='3'/>
            ];
        this.setState({"children": children});
    },

    render: function() {
        var item = this.props;
        return (
            <li>
               <img src={'/img/type-' + item.type + '.png'} title={item.type} className="ry-type-source"/>
                <Link to='result' params={{splat: item.uri}} onClick={this.loadChildren}>{item.reference}</Link>
                <span className='items-amount'>{item.len>0?'('+item.len+')':''}</span>
                <TreeView nodes={this.state.children} />
            </li>
        );
    }

});

module.exports = TreeNode;
