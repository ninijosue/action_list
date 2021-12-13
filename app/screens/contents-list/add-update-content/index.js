import React, { useEffect } from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import RecentButton from '../../../components/RecentButton';
import InputField from '../../../components/input-field';
import styles from './style';
import StorageSyncing from '../../../model/storageDataSyncing';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { customWidth } from '../../../helper/screenAdjuster';
import { connect } from 'react-redux';




const AddContent = (props) => {
    const { title, description } = props;
    const item = props.clickedItem;
    const itemId = item?.id;

    return (
        <Modal transparent visible={props.showPopup}>
            <View style={styles.modelContainer}>
                <View style={styles.modelContent}>
                    <View style={styles.modelHead}>
                        <Text style={styles.modelTitle}>{itemId ? "Update" : "Add"} Content</Text>
                        <Pressable onPress={e => { props.setShowPopup(false); props.updateClickedItem(null) }} style={styles.cancelBtn}>
                            <FontAwesomeIcon color="#5063C5" size={customWidth(6.2)} icon={faTimes} />
                        </Pressable>
                    </View>
                    <InputField value={title} onChangeText={text => setTitleValue(text, props)} type="text" placeholder="Title" />
                    <View style={styles.space} />
                    <InputField value={description} onChangeText={text => setDescriptionValue(text, props)} type="text" placeholder="Description" />
                    <View style={styles.space} />
                    <View style={styles.space} />
                    <View style={styles.submitBtnRow}>
                        <RecentButton
                            onPress={() => submitHandler(title, description, props, itemId)}
                            text={itemId ? "Update" : "Add new"}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const setTitleValue = (value, props) => {
    props.setValues({ 
        title: value,
        description: props.description
    });
}

const setDescriptionValue = (value, props) => {
    props.setValues({
        title: props.title,
        description: value
    });
}

const submitHandler = async (title, description, props, selectedItemId) => {
    const data = {
        title,
        description,
        created_at: new Date()
    };

    // get list of data in storage
    const listAllItemsFromStorage = await StorageSyncing.getAllItems();
    const currentList = listAllItemsFromStorage ?? {};

    if (!selectedItemId) {
        // get list of addedData from storage
        const listOfAllUnSyncedAddedItems = await StorageSyncing.getUnSyncedAddedItems();
        const addedList = listOfAllUnSyncedAddedItems ?? {};
        // adding data in storage
        await StorageSyncing.addInStorage(data);
        alert("product added");
        props.setShowPopup(false);
        getContents(props.updateContents);
    }
    else {
        if (!currentList[selectedItemId]) return;
        // get list of updatedData that are unSynced with DB
        const listOfUnSyncedUpdatedData = await StorageSyncing.getUnSyncedUpdatedItems();
        const updatedList = listOfUnSyncedUpdatedData ?? {};

        // add updated time
        data.update_at = new Date();
        // updating data in storage
        await StorageSyncing.updateInStorage(currentList, selectedItemId, data, updatedList);
        alert("product updated");
        props.setShowPopup(false);
        getContents(props.updateContents);
    }
}


const getContents = async (updateContent) => {
    const contents = [];
    const contentsFromStorage = await StorageSyncing.getAllItems();
    if (contentsFromStorage)
        Object.entries(contentsFromStorage)
            .forEach(([key, value]) => contents.push({ id: key, ...value }));
    updateContent(contents);
}

const mapStateToProps = state => {
    return {
        contents: state.contents,
        clickedItem: state.clickedItem,
        showPopup: state.showPopup,
        title: state.title,
        description: state.description
    }
};

const mapDispatchToProps = dispatch => ({
    updateContents: contents => dispatch({ contents, type: "UPDATE_CONTENTS" }),
    updateClickedItem: item => dispatch({ item, type: "UPDATE_CLICKED_ITEM" }),
    setShowPopup: value => dispatch({ value, type: "SHOW_POPUP" }),
    setValues: value => dispatch({ value, type: "SET_INPUT_VALUES" }),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddContent);



