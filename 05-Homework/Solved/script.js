$(document).ready(function() {
    // get times from moment
    const now = moment().format('MMMM Do YYYY');

    
    let nowHour24 = moment().format('H');
    let nowHour12 = moment().format('h');

    
    let $dateHeading = $('#navbar-subtitle');
    $dateHeading.text(now);
    

    let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

    

    if (storedPlans !== null) {
        planTextArr = storedPlans;
    } else {
        planTextArr = new Array(9);
    }

    

    let $plannerDiv = $('#plannerContainer');
    $plannerDiv.empty();

    for (let hour = 8; hour <= 18; hour++) {
        let index = hour - 9;
    
      // build row components
        let $rowDiv = $('<div>');
        $rowDiv.addClass('row');
        $rowDiv.addClass('plannerRow');
        $rowDiv.attr('hour-index',hour);
    
    
        let $col2TimeDiv = $('<div>');
        $col2TimeDiv.addClass('col-md-2');
    
        const $timeBoxSpn = $('<span>');
        $timeBoxSpn.attr('class','timeBox');
    
      // format hours for display
        let displayHour = 0;
        let ampm = "";
        if (hour > 12) { 
            displayHour = hour - 12;
            ampm = "pm";
        }   else {
            displayHour = hour;
            ampm = "am";
        }
    
        $timeBoxSpn.text(`${displayHour} ${ampm}`);
        $rowDiv.append($col2TimeDiv);
        $col2TimeDiv.append($timeBoxSpn);
        let $dailyPlanSpn = $('<input>');
        $dailyPlanSpn.attr('id',`input-${index}`);
        $dailyPlanSpn.attr('hour-index',index);
        $dailyPlanSpn.attr('type','text');
        $dailyPlanSpn.attr('class','dailyPlan');

        $dailyPlanSpn.val( planTextArr[index] );
    
        let $col9IptDiv = $('<div>');
        $col9IptDiv.addClass('col-md-9');

        $rowDiv.append($col9IptDiv);
        $col9IptDiv.append($dailyPlanSpn);

    
        let $col1SaveDiv = $('<div>');
        $col1SaveDiv.addClass('col-md-1');

        let $saveBtn = $('<i>');
        $saveBtn.attr('id',`saveid-${index}`);
        $saveBtn.attr('save-id',index);
        $saveBtn.attr('class',"far fa-save saveIcon");
    
        $rowDiv.append($col1SaveDiv);
        $col1SaveDiv.append($saveBtn);
        updateRowColor($rowDiv, hour);
    
        $plannerDiv.append($rowDiv);
    };

function updateRowColor ($hourRow,hour) { 
    if ( hour < nowHour24) {
        $hourRow.css("background-color","lightgrey")
    } 
        else if ( hour > nowHour24) {
        $hourRow.css("background-color","lightgreen")
    } 
        else {
        $hourRow.css("background-color","yellow")
    }
};

$(document).on('click','i', function(event) {
    event.preventDefault();  

    let $index = $(this).attr('save-id');
    let inputId = '#input-'+$index;
    let $value = $(inputId).val();
    planTextArr[$index] = $value;

    $(`#saveid-${$index}`).removeClass('shadowPulse');
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
});  

  // function to color save button on change of input
$(document).on('change','input', function(event) {
    event.preventDefault();  
    if (test) { console.log('onChange'); }
    if (test) { console.log('id', $(this).attr('hour-index')); }

    // neeed to check for save button

    let i = $(this).attr('hour-index');

    // add shawdow pulse class
    $(`#saveid-${i}`).addClass('shadowPulse');
    });
});