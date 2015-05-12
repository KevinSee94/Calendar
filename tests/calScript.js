//Main jQuery
$(document).ready(function() {
    $('#calendar').fullCalendar({
        height:600,
        selectable:true,
        //Buttons at top of page
        header:{
            left:'prev,next,today',
            center:'title',
            right:'month,agendaDay'
        },
        defaultView:'month',
        //Onclick function for dates
        dayClick:function(date,jsEvent,view){
            toDate = new Date(date);
            toDate.setDate(toDate.getDate() + 1 );
            console.log( toDate.toString() );
            $('#calendar').fullCalendar('gotoDate',toDate);
            $('#calendar').fullCalendar('changeView','agendaDay');
        }
    });
});

//Renders events and calls store()
function doSubmit( myTitle, myStart, myEnd, myColor ){
    $("#calendar").fullCalendar('renderEvent',
    {
        title:myTitle,
        start:myStart,
        end:myEnd,
        color:myColor
    }, true );
    store( myTitle, myStart, myEnd, myColor );
}

//Called only when retrieve() exectues on page load, same as doOnload() except it doesn't store to localStorage
function doOnload( myTitle, myStart, myEnd, myColor ){
    $("#calendar").fullCalendar('renderEvent',
    {
        title:myTitle,
        start:myStart,
        end:myEnd,
        color:myColor
    }, true );
}

//Stores events in localStorage
function store( myTitle, myStart, myEnd, myColor ){
    //Check browser support
    if( typeof(Storage) != "undefined" ){
        var toStore = { 'myTitle':myTitle, 'myStart':myStart, 'myEnd':myEnd, 'myColor':myColor };
        localStorage.setItem( myStart, JSON.stringify(toStore) );
        console.log( "Object stored!" );
    }
    else{
        console.log( "Current browser does not support HTML5 local storage" );
    }
}

//Gets events from localStorage on page load, then calls doOnload() to render them
function retrieve(){
    for( var i = 0, len = localStorage.length; i < len; i++ ){
        var key = localStorage.key(i);
        var value = localStorage[key];
        var retObj = JSON.parse(value);
        console.log( "Retrieved item with the follow attributes" + retObj.myTitle + ":::" + retObj.myStart + ":::" + retObj.myEnd + ":::" + retObj.myColor);
        doOnload( retObj.myTitle, retObj.myStart, retObj.myEnd, retObj.myColor );
    }
}

//Angular controller that keeps track of bound data and calls doSubmit when button is clicked
var app = angular.module('myApp', []);
app.controller('formCtrl', function($scope) {
    $scope.submit = function() {
        doSubmit( eName.value, ( sDate.value + "T" + sTime.value + ":00" ), ( eDate.value + "T" + sTime.value + ":00" ), "blue" );
    } 
});