/**
 * @jsx React.DOM
 */

var React = require('react');
var Link = require('react-router').Link;
var TreeNode = React.createClass({
    HIDE_CLASS: 'hide',
    SHOW_CLASS:'show',
    CHECKED_CLASS: 'checked',

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
           link = <Link to="result" key={'TL' + item.uri} params={{docset:item.docset, splat: item.uri}}><img src={'/img/type-' + item.type + '.png'} title={item.type} className="ry-type-source"/>{item.name}</Link>;
        }else{
           link = <a onClick={this.show}><img src={'/img/type-' + item.type + '.png'} title={item.type} className="ry-type-source"/>{item.name}</a>;
        }            
        return (
            <li className={this.state.show?this.CHECKED_CLASS:''}>
               {item.uri?'':<a onClick={this.show}><div className='list-arrow'></div></a>}
               {item.type==='docset'?<a onClick={this.show}><img src={'/img/languages/' + item.path + '-logo.png'} title={item.name} className="ry-language-source"/></a>:''}
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
