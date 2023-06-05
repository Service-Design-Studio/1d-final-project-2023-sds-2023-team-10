import * as admin from "firebase-admin";
import serviceAccount from "../environments/serviceAccount.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
  });
}

export default admin.firestore();
