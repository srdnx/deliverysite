// Configure database connection
var config = {
  apiKey: "AIzaSyCLAfmAd-z8BmO1LfnUbWo2Wr7dRC89mvQ",
  authDomain: "babushka-3ec2b.firebaseapp.com",
  databaseURL: "https://babushka-3ec2b.firebaseio.com",
  projectId: "babushka-3ec2b",
  storageBucket: "",
  messagingSenderId: "683277919368"
};
firebase.initializeApp(config);

// Generate unique id for users or orders
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Write user in database
function writeUserData() {
  var form = document.forms['form1'];
  var id = uuidv4();

  firebase.database().ref('users/' + id).set({
    name: form.elements['name'].value,
    phone: form.elements['phone'].value,
    passport: form.elements['passport'].value,
    address: form.elements['address'].value,
    privilegies: form.elements['privilegies'].checked,
    card: form.elements['card'].value
  });

  document.getElementById('infolabel').innerHTML = 'Користувача ' + form.elements['name'].value + ' було добавлено';
}

// Id, name and orderlist of searched user
var userid;
var username;
// Find user in database
function findUser() {
  userid = undefined;
  var form = document.forms['form2'];
  var tgform = document.forms['form3'];
  var value = form.elements['phone'].value;
  firebase.database().ref('users').orderByChild('phone').equalTo(value).on("value", function(snapshot) {
    for(var a in snapshot.val()) {
      userid = a;
    }
    if (userid != undefined) {
      username = snapshot.val()[userid]['name'];
      document.getElementById('phone1').value = snapshot.val()[userid]['phone'];
      document.getElementById('address').value = snapshot.val()[userid]['address'];
      document.getElementById('infolabel').innerHTML = 'Користувача ' + snapshot.val()[userid]['name'] + ' було знайдено';
    } else {
      document.getElementById('infolabel').innerHTML = 'Користувача за цим номером телефона не знайдено';
    }
  });
}

// Write order in database
function writeOrder() {
  if (userid != undefined) {
    var form = document.forms['form3'];
    var id = uuidv4();

    firebase.database().ref('orders/' + id).set({
      name: username,
      userid: userid,
      phone: form.elements['phone1'].value,
      address: form.elements['address'].value,
      goods: form.elements['goods'].value,
      price: form.elements['price'].value,
      comment: form.elements['comment'].value,
      status: true
    });

    document.getElementById('infolabel1').innerHTML = 'Замовлення було добавлено';
  } else {
    document.getElementById('infolabel1').innerHTML = 'Не вибраний користувач замовлення';
  }
}
