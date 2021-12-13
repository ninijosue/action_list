import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";
import StorageSyncing from "./storageDataSyncing";

export default class SyncDB {
    static async syncData(uid) {

        // user reference
        const userRef = firestore().collection("users").doc(uid);


        // initializing data form storage
        const dataToUpdate = await StorageSyncing.getUnSyncedUpdatedItems();
        const dataToDelete = await StorageSyncing.getAllUnSyncedDeleteItems();
        const dataToAdd = await StorageSyncing.getUnSyncedAddedItems();

        const promisesOfDataToAdd = [];
        const promisesOfDataToUpdate = [];
        const promisesOfDataToDelete = [];


        try {
            // add items of storage to DB
            if (dataToAdd) {
                Object.entries(dataToAdd).forEach(([key, value]) => {
                    const snap = userRef.collection("contents").doc(key).set(value);
                    promisesOfDataToAdd.push(snap);
                });
                await AsyncStorage.setItem("addedList", "");
            }
            // update items of storage to DB
            if (dataToUpdate) {
                Object.entries(dataToUpdate).forEach(([key, value]) => {
                    const snap = userRef.collection("contents").doc(key).update(value);
                    promisesOfDataToUpdate.push(snap);
                });
                await AsyncStorage.setItem("updatedList", "");
            }
            // delete items of storage to DB
            if (dataToDelete) {
                dataToDelete.forEach((key) => {
                    const snap = userRef.collection("contents").doc(key).delete();
                    promisesOfDataToDelete.push(snap);
                });
                await AsyncStorage.setItem("deletedList", "");

            }

            // finalization
            await Promise.all(promisesOfDataToAdd);
            await Promise.all(promisesOfDataToUpdate);
            await Promise.all(promisesOfDataToDelete);


        } catch (error) {
            console.error(error)
        }
    }
}