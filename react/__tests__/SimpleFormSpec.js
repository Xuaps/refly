/** @jsx React.DOM */
jest.dontMock('../components/simpleform.jsx');
jest.dontMock('./stubRouterContext.jsx');
var stubRouterContext = require('./stubRouterContext.jsx');
var React = require('react/addons');
var routes = require('../components/routes.jsx');
var TestUtils = React.addons.TestUtils;
var Simpleform = require('../components/simpleform.jsx');
var Subject = stubRouterContext(Simpleform);

describe('Simpleform Component', function(){

    describe('Initial State', function(){
        xit('should be empty', function(){
            React.renderComponent(routes, document.createElement('div'));
            var Simpleformc = TestUtils.renderIntoDocument(<Simpleform/>);
			expect(Simpleformc.state.data.length).toEqual(0);
        });
    });

    describe('Simpleform references', function(){
        it('should send an email and return state <sent> and <succeed>', function(){
            var simpleformc = TestUtils.renderIntoDocument(<Subject messages={{done: "Message sent correctly", fail: "message sent fail"}}/>);
			simpleformc.setProps({apikey: '6b30dc7d52fdeb7892dab94c7fe955b7'});
			simpleformc._renderedComponent.sendMail({mail: 'mail', name: 'name', message: 'message'});
			expect(simpleformc._renderedComponent.state.sent).toEqual(true);
			expect(simpleformc._renderedComponent.state.succeed).toEqual(true);
        });
    });

});
