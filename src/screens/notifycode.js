// async function onAppBootstrap() {
//   // Register the device with FCM
//   await messaging().registerDeviceForRemoteMessages();

//   // Get the token
//   const token = await messaging().getToken();

//   // Save the token
//   console.log(token);
//   saveTokenToDatabase(token);
//   storeData();
//   // fetch('https://congtimviec.firebaseio.com/notifi/users.json', {
//   //   method: 'POST',
//   //   headers: {
//   //     Accept: 'application/json',
//   //     'Content-Type': 'application/json',
//   //   },
//   //   body: JSON.stringify({
//   //     time: new Date().toLocaleString(),
//   //     tokenID: token,
//   //   }),
//   // }).then(response => {
//   //   if (response.status == 200) {
//   //     alert('Bạn đã đăng kí nhận thông báo thành công');
//   //   }
//   // });
// }

// const resolvedProm = firestore().collection('users').get();

// let getToken = resolvedProm.then(querySnapshot => {
//   querySnapshot.forEach(documentSnapshot => {
//     return documentSnapshot.data().tokens;
//   });
// });
// async function getMarker() {
//   const snapshot = await firestore().collection('users').get();
//   return snapshot.docs.map(doc => doc.data().tokens);
// }

// console.log(getMarker());

// const testGetData = () => {
// firestore()
//   .collection('users')
//   .get()
//   .then(querySnapshot => {
//     querySnapshot.forEach(documentSnapshot => {
//       console.log(
//         'User ID: ',
//         documentSnapshot.id,
//         'Token:',
//         documentSnapshot.data().tokens,
//       );
//     });

//       querySnapshot.forEach(documentSnapshot => {
//         return documentSnapshot.data().tokens;
//       });
//     });
// };
// <Button
//   title="Đăng ký nhận thông báo"
//   onPress={() =>
//     messaging()
//       .subscribeToTopic('job')
//       .then(() => console.log('Subscribed to topic!'))
//   }></Button>;
