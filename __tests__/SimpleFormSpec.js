/** @jsx React.DOM */
jest.dontMock('../components/simpleform.jsx');
var Simpleform;
var TestUtils;
var routes;
var React;
React = require('react/addons');
routes = require('../components/routes.jsx');
TestUtils = React.addons.TestUtils;
Simpleform = require('../components/simpleform.jsx');

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
            React.renderComponent(routes, document.createElement('div'));
            var simpleformc = TestUtils.renderIntoDocument(<Search/>);
			simpleformc.setProps({apikey: '6b30dc7d52fdeb7892dab94c7fe955b7'});
			simpleformc.sendMail({mail: 'mail', name: 'name', message: 'message'});
			expect(simpleformc.state.sent).toEqual(true);
			expect(simpleformc.state.succeed).toEqual(true);
        });
    });

});
