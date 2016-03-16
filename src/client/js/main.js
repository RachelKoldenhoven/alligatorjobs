// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');

  var states = { AL: 'Alabama',
                   AK: 'Alaska',
                   AZ: 'Arizona',
                   AR: 'Arkansas',
                   CA: 'California',
                   CO: 'Colorado',
                   CT: 'Connecticut',
                   DE: 'Delaware',
                   DC: 'District Of Columbia',
                   FL: 'Florida',
                   GA: 'Georgia',
                   HI: 'Hawaii',
                   ID: 'Idaho',
                   IL: 'Illinois',
                   IN: 'Indiana',
                   IA: 'Iowa',
                   KS: 'Kansas',
                   KY: 'Kentucky',
                   LA: 'Louisiana',
                   ME: 'Maine',
                   MD: 'Maryland',
                   MA: 'Massachusetts',
                   MI: 'Michigan',
                   MN: 'Minnesota',
                   MS: 'Mississippi',
                   MO: 'Missouri',
                   MT: 'Montana',
                   NE: 'Nebraska',
                   NV: 'Nevada',
                   NH: 'New Hampshire',
                   NJ: 'New Jersey',
                   NM: 'New Mexico',
                   NY: 'New York',
                   NC: 'North Carolina',
                   ND: 'North Dakota',
                   OH: 'Ohio',
                   OK: 'Oklahoma',
                   OR: 'Oregon',
                   PA: 'Pennsylvania',
                   RI: 'Rhode Island',
                   SC: 'South Carolina',
                   SD: 'South Dakota',
                   TN: 'Tennessee',
                   TX: 'Texas',
                   UT: 'Utah',
                   VT: 'Vermont',
                   VA: 'Virginia',
                   WA: 'Washington',
                   WV: 'West Virginia',
                   WI: 'Wisconsin',
                   WY: 'Wyoming'};

    for (var i in states) {
        $("#stateDropDown").append('<option value='+i+'>'+states[i]+'</option>');
    }
});


$('#contactSubmit').on('click', function(event) {
    event.preventDefault();
    var phone = $('#phone').val();
    phone = phone.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/\s/g, '');
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var email = $('#email').val();

//how will i get the id from the url? or req.user? sldkfjdslkjfdslk
    var url = $('form').first().attr('action');

    $.ajax({
        url: url,
        method: PUT,

    }).success(function(response) {
        $('#contactMessage').html('<p>'+response.message+'</p>');
    })
});
