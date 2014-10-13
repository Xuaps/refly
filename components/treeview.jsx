/**
 * @jsx React.DOM
 */

var React = require('react');
var Link = require('react-router').Link;
var TreeNode = React.createClass({
    getInitialState: function() {
        return {
        };
    },

    render: function() {
        var item = this.props;
        return (
            <li>
               <img src={'/img/type-' + item.type + '.png'} title={item.type} className="ry-type.source"/>
               {/*<Link to='result' params={{splat: item.uri}}>{item.reference}</Link>*/}
               <span className='cursive'>{item.len>0?'('+item.len+')':''}</span>
            </li>
        );
    }

});

var store = require('../public/js/store.js');
var TreeView = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
    },
    
    componentWillMount: function(){
        store.get('docsets').then(function(response){
            this.setState({data: response});
        }.bind(this));
    },

    render: function() {
        return (
            <div id="tree-view" className="half-height">
                <div className="component-header"><a>Treeview</a></div>
                <div className="component-content">
                    <ul>
                        {this.state.data.map(
                            function(ref){
                                return ( <TreeNode key={ref.uri} type={ref.type} reference={ref.name} uri={ref.uri}/> );
                            })
                        }
                    </ul>
               </div>
            </div>
        );
    },
});

module.exports = TreeView;
