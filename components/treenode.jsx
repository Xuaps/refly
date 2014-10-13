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
        return (
            <li>
               <img src={'/img/type-' + item.type + '.png'} title={item.type} className="ry-type.source"/>
               <Link to='result' params={{splat: item.url}} onClick={this.loadChildren}>{item.reference}</Link>
               <span className='cursive'>{item.len>0?'('+item.len+')':''}</span>
               <ul>
                    {this.state.data.map(
                        function(ref){
                            return ( <TreeNode key={ref.url} type={ref.type} name={ref.name} url={ref.url}/> );
                        })
                    }
               </ul>
            </li>
        );
    },

    loadChildren: function(){
        store.get('type', {docset: this.props.name})
            .then(function(types){
                this.setState({data: types});
            }.bind(this));
    }

});

module.exports = TreeNode;
