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
        $("#stateDropDown").append('<option name="state" value='+i+'>'+states[i]+'</option>');
    }

    var skillsload = {1: 'Accounting',
            2: 'Automotive',
            3: 'Banking',
            4: 'Business Development',
            5: 'Child Care',
            6: 'Construction',
            7: 'Customer Service',
            8: 'Distribution Shipping',
            9: 'Design',
            10: 'Education Teaching',
            11: 'Engineering',
            12: 'Facilities',
            13: 'Finance',
            14: 'General Business',
            15: 'General Labor',
            16: 'Government',
            17: 'Grocery',
            18: 'Health Care',
            19: 'Hospitality',
            20: 'Human Resources',
            21: 'Information Technology',
            22: 'Insurance',
            23: 'Legal',
            24: 'Journalism',
            25: 'Maintenance/Repair',
            26: 'Management',
            27: 'Manufacturing',
            28: 'Telecommunications',
            29: 'Social Services',
            30: 'Pharmaceutical',
            31: 'QA Quality Control',
            32: 'Real Estate',
            33: 'Research',
            34: 'Food Service',
            35: 'Retail',
            36: 'Skilled Labor Trades',
            37: 'Strategy Planning',
            38: 'Transportation',
            39: 'Warehouse' };

    for (var i in skillsload) {
        $(".skill-name").append('<option value='+i+'>'+skillsload[i]+'</option>');
    }

    var levelLoad = { 1: 'Interested, 0 years experience',
            2: 'Some experience, 1-2 years',
            3: 'Intermediate, 3-5 years experience',
            4: 'Skilled, 5+ years experience' };

    for (var i in levelLoad) {
        $(".level-name").append('<option value='+i+'>'+levelLoad[i]+'</option>');
    }
});


$('#contactSubmit').on('click', function(event) {
    event.preventDefault();
    var phone = $('#phone').val();
    phone = phone.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/\s/g, '').replace(/\D+/g, '');
    var dataObject = {
            fname: $('#fname').val(),
            lname: $('#lname').val(),
            email: $('#email').val(),
            phone: phone
        };
    var url = $('#contactForm').attr('action');

    $.ajax({
        url: url,
        type: 'PUT',
        data: dataObject,
        datatype: 'json',
        success: function(response) {
        $('#contactMessage').html('<p>'+response.message+'</p>');
            }
    });
});

$('#addressSubmit').on('click', function(event) {
    event.preventDefault();
    var zip = $('#zip').val()
    zip = zip.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/\s/g, '').replace(/\D+/g, '').slice(0, 5);
    var dataObject = {
        line_1: $('#line_1').val(),
        line_2: $('#line_2').val(),
        city: $('#city').val(),
        state: $('#stateDropDown option:selected').val(),
        zip: zip
    }
    var url = $('#addressForm').attr('action');

    $.ajax({
        url: url,
        type: 'POST',
        data: dataObject,
        datatype: 'json',
        success: function(response) {
        $('#addressMessage').html('<p>'+response.message+'</p>');
            }
    });
});

$('#skillSubmit').on('click', function(event) {
    event.preventDefault();
    var skillArray = [];
    for (var i = 0; i < 3; i++) {
        var objectify = new Object;
        objectify.skill_id = $('.skillrow > .form-group > div > select.skill-name option:selected')[i].value;
        objectify.level_id = $('.skillrow > .form-group > div > select.level-name option:selected')[i].value;
        skillArray.push(objectify);
    }
    var dataObject = {
        english: $('#english').val(),
        other_skills: $('#other_skills').val(),
        skills: skillArray
    };
    console.log(dataObject);
    var url = $('#skillsForm').attr('action');

    $.ajax({
        url: url,
        type: 'POST',
        data: {'data':JSON.stringify(dataObject)},
        success: function(response) {
            $('#skillMessage').html('<p>'+response.message+'</p>');
            }
    });
});

$('#delete').on('click', function(event) {
  event.preventDefault();
  var targets = [];
  var $sel = $('table tr input[type=checkbox]:checked');
  console.log('$sel', $sel);

  for (var i = 0; i < $sel.length; i++) {
    targets.push($sel[i].value);
  }
  var payload = {};
  console.log('targets', targets);

  payload['deleteTargets'] = targets;

  console.log('payload', payload);
  var url = '/admin/users/delete';
    $.ajax({
      url: url,
      type: 'POST',
      data: JSON.stringify(payload),
      contentType: 'application/json; charset=utf-8',
      success: function(res) {
        function createRemove (el, index, array) {
          return $('#' + el).empty();
        }
        res.forEach(createRemove);
      }
    });
});

