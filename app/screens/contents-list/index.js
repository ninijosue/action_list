import React from "react";
import { View, Text, FlatList, TouchableOpacity, Pressable, Alert } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import styles from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { customWidth } from "../../helper/screenAdjuster";
import Header from "../../components/header";
import AddContent from "./add-update-content";
import StorageSyncing from "../../model/storageDataSyncing";
import { connect } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import SyncDB from "../../model/syncDataWithDB";
import { SafeAreaView } from "react-native-safe-area-context";


class ListOfContent extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedItems: new Map(), // selected items,
            isConnected: false
        }

        this.ItemRender = this.ItemRender.bind(this);
        this.performDelete = this.performDelete.bind(this);
    }

    updateDataWhenConnectedToInternet() {
        const props = this.props;
        const user = props.user;
        if (!user) return;

        NetInfo.addEventListener(({ isConnected }) => this.setState({ isConnected }));

        setInterval(() => {
            if (this.state.isConnected) SyncDB.syncData(user.uid);
        }, 10000);
    }

    componentDidMount() {
        // get all items from storage
        this.getContents();
        // when there is network sync with DB
        this.updateDataWhenConnectedToInternet()
    }

    // get all current items from storage
    async getContents() {
        const updateContent = this.props.updateContents;
        const contents = [];
        const contentsFromStorage = await StorageSyncing.getAllItems();
        if (contentsFromStorage)
            Object.entries(contentsFromStorage)
                .forEach(([key, value]) => contents.push({ id: key, ...value }));
        updateContent(contents);
    }

    // delete selected items form storage
    async performDelete() {
        const itemsToDelete = [];
        Array.from(this.state.selectedItems.keys()).forEach((key) => {
            itemsToDelete.push(StorageSyncing.deleteDataFromStorage(key));
        });


        await Promise.all(itemsToDelete);

        this.setState({ selectedItems: new Map() });
        this.getContents();
    }

    //asking for confirmation about the delete of selected items
    async deleteItems() {
        const state = this.state;
        Alert.alert("Confirm", "Do you want delete these items?", [
            {
                text: "No"
            },
            {
                text: "Yes",
                onPress: () => this.performDelete()
            }

        ]);

    }

    // perform selection for checked lists
    checkHandler(value, item) {
        const selectedItems = this.state.selectedItems;
        if (value) selectedItems.set(item.id, item);
        else selectedItems.delete(item.id);
        this.setState(selectedItems);
    }

    // onclick of an item then show item info
    itemClickHandler(item, props) {
        props.updateClickedItem(item);
        props.setShowPopup(true);
    }

    // add new item
    addNewContent() {
        this.props.updateClickedItem(null);
        this.props.setShowPopup(true);
    }

    // single item info
    ItemRender({ item }) {
        const isChecked = this.state.selectedItems.has(item.id);
        return (
            <View>
                <View style={styles.mainItemsRow}>
                    <Pressable onPress={() => this.itemClickHandler(item, this.props)} style={styles.contentCart}>
                        <Text style={styles.contentTitle}>{item.title}</Text>
                        <Text style={styles.mainHistory}>{item.description}</Text>
                    </Pressable>
                    <CheckBox value={isChecked} onValueChange={value => this.checkHandler(value, item)} />
                </View>
                <View style={styles.bottomContentBarSeparator} />
            </View>
        )
    }

    // render
    render(props, state) {
        const isItemsSelected = this.state.selectedItems.size !== 0;
        const iconToShowOnBtn = isItemsSelected ? faTrash : faPlus;
        const btnBackgroundColor = isItemsSelected ? "#e91e63" : "#094EFF";
        return (
            <SafeAreaView>
                <View>
                    <Header />
                    <View style={styles.mainContainer}>
                        <FlatList
                            data={this.props.contents}
                            renderItem={this.ItemRender}
                            keyExtractor={item => item.id}
                        />
                        <TouchableOpacity onPress={() => isItemsSelected ? this.deleteItems() : this.addNewContent()} style={{ ...styles.floatingBtnContainer, backgroundColor: btnBackgroundColor }} >
                            <View>
                                <FontAwesomeIcon color="#FFFFFF" size={customWidth(6.2)} icon={iconToShowOnBtn} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <AddContent />
                </View >
            </SafeAreaView>
        )
    }
}


// connecting state and dispatch to props
const mapStateToProps = state => {
    return {
        contents: state.contents,
        clickedIte: state.clickedItem,
        showPopup: state.showPopup,
        chosenContent: state.selectedItems,
        user: state.user
    }
};

const mapDispatchToProps = dispatch => ({
    updateContents: contents => dispatch({ contents, type: "UPDATE_CONTENTS" }),
    updateClickedItem: item => dispatch({ item, type: "UPDATE_CLICKED_ITEM" }),
    setShowPopup: value => dispatch({ value, type: "SHOW_POPUP" }),
    setSelectedItems: value => dispatch({ value, type: "SET_SELECTED_ITEMS" })
})

export default connect(mapStateToProps, mapDispatchToProps)(ListOfContent);





