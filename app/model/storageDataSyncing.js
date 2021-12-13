import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uniqId } from 'uuid';
import { randomString } from "../helper/generators";


export default class StorageSyncing {

    static async getAllItems() {
        // get list of data in storage
        const localList = await AsyncStorage.getItem("currentList", this.storageErrorHandler);
        return JSON.parse(localList);
    }

    // get list of addedData from storage which are not synced with DB
    static async getUnSyncedAddedItems() {
        const addedListFromStorage = await AsyncStorage.getItem("addedList", this.storageErrorHandler);
        return JSON.parse(addedListFromStorage);
    }

    // get list of updated items from storage which are not synced with DB
    static async getUnSyncedUpdatedItems() {
        const updatedListFromStorage = await AsyncStorage.getItem("updatedList", this.storageErrorHandler);
        return JSON.parse(updatedListFromStorage);
    }

    static async getAllUnSyncedDeleteItems() {
        // get list of delete items from storage
        const deleteListFromLocalStorage = await AsyncStorage.getItem("deletedList", this.storageErrorHandler);
        return JSON.parse(deleteListFromLocalStorage);
    }

    static async addAndUpdateDataInStorage(data, selectedItemId) {
        // get list of data in storage
        const listAllItemsFromStorage = await this.getAllItems();
        const currentList = listAllItemsFromStorage ?? {};

        if (!selectedItemId) {
            // get list of addedData from storage
            const listOfAllUnSyncedAddedItems = this.getUnSyncedAddedItems()
            const addedList = listOfAllUnSyncedAddedItems ?? {};

            // adding data in storage
            this.addInStorage(currentList, data, addedList);
        }
        else {
            if (!currentList[selectedItemId]) return;
            // get list of updatedData that are unSynced with DB
            const updatedList = this.getUnSyncedUpdatedItems() ?? {};

            // add updated time
            data.update_on = new Date();
            // updating data in storage
            this.updateInStorage(currentList, selectedItemId, data, updatedList);

        }
    }



    // add data in storage
    static async addInStorage(data) {
        const id = randomString();
        const contentsFromStorage = await this.getAllItems();
        const currentList = contentsFromStorage ?? {};
        currentList[id] = data;

        const unSyncedAddedContentFromStorage = await this.getUnSyncedAddedItems();
        const addedList = unSyncedAddedContentFromStorage ?? {};
        addedList[id] = data

        //updating current list of data in storage
        await AsyncStorage.setItem("currentList", JSON.stringify(currentList), this.storageErrorHandler);

        // add the added data in list of added data before syncing data with DB
        await AsyncStorage.setItem("addedList", JSON.stringify(addedList), this.storageErrorHandler);

        await AsyncStorage.setItem("changeIdentifier", randomString());

        console.log("item added");
    }


    // update data in storage
    static async updateInStorage(currentList, itemId, data, updatedList) {
        const updatedData = {
            ...data,
            updated_on: new Date()
        };
        currentList[itemId] = updatedData;
        updatedList[itemId] = updatedData;

        //updating current list of data in storage
        await AsyncStorage.setItem("currentList", JSON.stringify(currentList), this.storageErrorHandler);

        // add the updated data in list of updated data before syncing data with DB
        await AsyncStorage.setItem("updatedList", JSON.stringify(updatedList), this.storageErrorHandler);

        console.log("item updated");
    }

    static async deleteDataFromStorage(itemIdToDelete) {
        // get list of data in storage
        const localList = await this.getAllItems();
        const currentList = localList ?? {};


        // delete item from current list of data in storage
        delete currentList[itemIdToDelete];

        //updating current list of data in storage
     try {
        await AsyncStorage.setItem("currentList", JSON.stringify(currentList), this.storageErrorHandler);

        // get list of delete items from storage
        const deleteListFromLocalStorage = await this.getAllUnSyncedDeleteItems();
        const deletedList = deleteListFromLocalStorage ?? [];

        // add deleted item in deleteList in storage
        deletedList.push(itemIdToDelete);

        // add deleted ite in deleted list for the purpose of delete the item from DB
        await AsyncStorage.setItem("deletedList", JSON.stringify(deletedList), this.storageErrorHandler);

     } catch (error) {
         console.error(error);
     }
    }


    // error handler for dev thrown by storage
    static storageErrorHandler(error) {
        if (error) console.error("****error", error);

    }

}