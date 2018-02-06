'use strict';

const functions = require('firebase-functions');
const DialogflowApp = require('actions-on-google').DialogflowApp;

const NO_INPUTS = [
  'I didn\'t hear that.',
  'If you\'re still there, say that again.',
  'We can stop here. See you soon.'
];
const TRY_AGAIN = [
  'Can\'t help you with that yet, try again',
  'I don\'t understand, say that again.',
  'We can stop here. See you soon.'
];

//exports.parcelBuddy = functions.https.onRequest((request, response) => {
exports.parcelBuddy = functions.https.onRequest((req, res) => {
  const app = new DialogflowApp(req, res);

  //Initial intent
  function welcomeIntent (app){
	let inputPrompt = app.buildRichResponse()
	.addSimpleResponse('Hi there! Welcome to Parcel Buddy, i can tell you the aproximate shipping cost of your parcel, please select a courier service.')
	.addSuggestions(['DHL', 'UPS', 'An Post', 'Fastway', 'Cancel'])
	//.addSuggestionLink('ParcelBuddy Link', 'http://www.tuxorservices.ie/aog/parcelbuddy/')
	app.ask(inputPrompt);
  }

  function weightIntent (app){
	let inputPrompt = app.buildRichResponse()
	.addSimpleResponse('Whats the maximum weight of the parcel?')
	.addSuggestions(['250 g', '500 g', '1 kg', '10 kg', '20 kg', '30 kg'])
	//.addSuggestionLink('ParcelBuddy Link', 'http://www.tuxorservices.ie/aog/parcelbuddy/')
	app.ask(inputPrompt);
  }

  function sizeIntent (app){
    console.log('rawInput');
    let inputPrompt = app.buildInputPrompt(false, 'You selected: ' + app.getRawInput() + ', from what location are you sending the parcel?', NO_INPUTS);
    switch (app.getRawInput()) {
      case 'letter':
            app.ask(inputPrompt);
            break;
      case 'envelope':
            app.ask(inputPrompt);
            break;
      case 'packet':
           app.ask(inputPrompt);
           break;
      case 'parcel':
           app.ask(inputPrompt);
           break;
      default:
           inputPrompt = app.buildInputPrompt(false, 'Can\'t help you with that yet, try again', NO_INPUTS);
           app.ask(inputPrompt);
    }
  }

  function locationIntent (app){
  let inputPrompt = app.buildRichResponse()
  .addSimpleResponse('From what location are you sending the parcel?')
  .addSuggestions(['Europe', 'Asia', 'America', 'Africa', 'Oceania'])
  //.addSuggestionLink('ParcelBuddy Link', 'http://www.tuxorservices.ie/aog/parcelbuddy/')
  app.ask(inputPrompt);
  }

  function destinationIntent (app){
  let inputPrompt = app.buildRichResponse()
  .addSimpleResponse('Whats the destination of the parcel?')
  .addSuggestions(['Europe', 'Asia', 'America', 'Africa', 'Oceania'])
  //.addSuggestionLink('ParcelBuddy Link', 'http://www.tuxorservices.ie/aog/parcelbuddy/')
  app.ask(inputPrompt);
  }

  function youSelected (app){
    //let inputPrompt = app.buildInputPrompt(false, 'You selected: ' + app.getRawInput() + ', whats the size of the parcel?', NO_INPUTS);
	let inputPrompt = app.buildRichResponse()
	.addSimpleResponse('You selected: ' + app.getRawInput() + ', whats the size of the parcel?')
	.addSuggestions(['250 g', '500 g', '1 kg', '10 kg', '20 kg', '30 kg'])
    app.ask(inputPrompt);
  }

  //quote intent handler
  function providerIntent (app) {
	console.log('rawInput');
    if (app.getRawInput() === 'DHL' || app.getRawInput() == 'dhl') {
      //let inputPrompt = app.buildInputPrompt(false, 'You selected: ' + app.getRawInput() + ', whats the size of the parcel?', NO_INPUTS);
      let inputPrompt = app.buildRichResponse()
	  .addSimpleResponse('You selected: ' + app.getRawInput() + ', whats the size of the parcel?')
	  .addSuggestions(['250 g', '500 g', '1 kg', '10 kg', '20 kg', '30 kg'])
	  app.ask(inputPrompt);
    } else {
      let inputPrompt = app.buildInputPrompt(false, 'Can\'t help you with that yet, try again', NO_INPUTS);
      app.ask(inputPrompt);
    }
  }
  
  //quote size handler
  function providerIntent2 (app) {
	console.log('rawInput');
    if (app.getRawInput() === '250 g') {
		let inputPrompt = app.buildRichResponse()
		.addSimpleResponse('You selected: ' + app.getRawInput() + ', from what location are you sending the parcel?')
		.addSuggestions(['Europe', 'Asia', 'America', 'Africa', 'Oceania'])
		app.ask(inputPrompt);
	} else {
		let inputPrompt = app.buildInputPrompt(false, 'Can\'t help you with that yet, try again', NO_INPUTS);
		app.ask(inputPrompt);
    }
  }
   

  let actionMap = new Map();
  actionMap.set('input.welcome', welcomeIntent);
  actionMap.set('weight.action', weightIntent);
  actionMap.set('size.action', sizeIntent);
  actionMap.set('location.action', locationIntent);  
  actionMap.set('selected.action', youSelected);
  actionMap.set('provider.action', providerIntent);
  
  app.handleRequest(actionMap);

//}
});
