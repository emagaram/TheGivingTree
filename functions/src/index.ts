import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp()
/* eslint-disable no-debugger, no-console */

const increment = admin.firestore.FieldValue.increment(1)

//Will change once JustGiving is integrated

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  await admin.firestore().collection("UserData").add({
    display_name: "dn",
    display_photo: "address",
    user_id: "getUID",
    date_joined: "getDateInConsistentTimezone",
  })
})

//Make this a transaction at some point to avoid race conditions!
export const addDonation = functions.https.onCall(async (data, context) => {
  let count: number = 0
  try {
    let docRef = admin.firestore().collection("DonationsCount").doc("count")
    const doc = await docRef.get()
    if (doc.exists) {
      let data: any = doc.data()
      if (data.count !== null) {
        count = data.count
      }
      functions.logger.info("Found document data:", data)
    } else {
      await docRef.set({
        count: count,
      })
      functions.logger.info("No such document! Creating one")
    }
    functions.logger.info("data")
    functions.logger.info(data)
    await admin
      .firestore()
      .collection("Donations")
      .add({
        amount: data.amount,
        charity: data.charity,
        parent_id: data.parent_id,
        donor_id: count,
        layer: (await findDonationLayer(data.parent_id)) + 1,
        display_name: data.display_name,
      })
    functions.logger.info("Added donation")
    docRef.update({ count: increment })
    return { a: "added successfully" }
  } catch (error) {
    functions.logger.info("Error adding donation")
    return { a: "did not add" }
  }
})
async function getDonations() {
  const donations: any[] = []
  await admin
    .firestore()
    .collection("Donations")
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        donations.push(doc.data())
      })
    })
  return donations
}

async function findDonationLayer(id: number): Promise<number> {
  //need to check if parent exists!

  functions.logger.info("dnations")
  let donations: any[] = await getDonations()
  functions.logger.info(donations)
  for (let i = 0; i < donations.length; i++) {
    functions.logger.info("made to loop")
    if (donations[i].donor_id === id) {
      functions.logger.info("made to if")
      return donations[i].layer
    }
  }
  functions.logger.info("findDonationLayer executed wrong or first child")
  return 0
}
// const onDonationRequestsUpdate = () => {
//   admin
//     .firestore()
//     .collection("DonationRequests")
//     .onSnapshot(async (snapshot) => {
//       console.log("Donation request incoming")
//       let donationRequests: DonationRequest[] = []
//       let docRef = admin.firestore().collection("DonationsCount").doc("count")
//       let count: number = 0
//       try {
//         const doc = await docRef.get()
//         if (doc.exists) {
//           let data: any = doc.data()
//           if (data.count !== null) {
//             count = data.count
//           }
//           console.log("Found document data:", data)
//         } else {
//           count = 0
//           docRef.set({
//             count: count,
//           })
//           console.log("No such document! Creating one")
//         }
//         snapshot.forEach((doc) => donationRequests.push(doc.data().name))

//         let donations = getDonations()

//         for (let i = 0; i < donationRequests.length; i++) {
//           try {
//             await admin
//               .firestore()
//               .collection("Donations")
//               .add({
//                 amount: donationRequests[i].amount,
//                 charity: donationRequests[i].charity,
//                 parent_id: donationRequests[i].parent_id,
//                 donor_id: count,
//                 layer:
//                   findDonationLayer(
//                     donationRequests[i].parent_id,
//                     await donations
//                   ) + 1,
//                 display_name: donationRequests[i].display_name,
//               })
//             await docRef.set({ count: ++count }) //Should use a transaction to ensure nothing can access count
//           } catch (error) {
//             console.log("Couldn't successfully add a doc to donations")
//           }
//         }
//       } catch (error) {
//         console.log("Error getting docCount")
//       }
//     })
// }
// const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true })
//   response.send("Hello from Firebase!")
// })
