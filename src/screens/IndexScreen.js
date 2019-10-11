import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
// import { Context } from "../context/BlogContext";
// import { Feather } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";

import { addData } from "../actions";
import Data from "../sample";

const IndexScreen = props => {
  const dispatch = useDispatch();

  //1 - DECLARE VARIABLES
  const [isFetching, setIsFetching] = useState(false);

  //Access Redux Store State
  const dataReducer = useSelector(state => state.dataReducer);
  const { data } = dataReducer;

  //==================================================================================================

  //2 - MAIN CODE BEGINS HERE
  useEffect(() => getData(), []);

  //==================================================================================================

  //3 - GET FLATLIST DATA
  const getData = () => {
    setIsFetching(true);

    //OPTION 1 - LOCAL DATA using instructions.json file
    //delay the retrieval [Sample reasons only]
    setTimeout(() => {
      const data = Data.splits;
      dispatch(addData(data));
      setIsFetching(false);
    }, 2000);
    // console.log(dispatch(addData(data)));
  };

  //4 - RENDER FLATLIST ITEM
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.title}>
          {parseInt(index) + 1}
          {". "}
          {item.title}
        </Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  //
  //==================================================================================================

  //5 - RENDER
  if (isFetching) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator animating={true} />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: "#F5F5F5", paddingTop: 20 }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `flat_${index}`}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },

  row: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10
  },

  title: {
    fontSize: 15,
    fontWeight: "600"
  },

  description: {
    marginTop: 5,
    fontSize: 14
  }
});

// const IndexScreen = () => {
//   return (
//     <View>
//       <Text>IndexScreen</Text>
//       {/* <FlatList
//                 data={state}
//                 keyExtractor={blogPost => blogPost.title}
//                 renderItem={({ item }) => {
//                     return (
//                         <TouchableOpacity
//                             onPress={() => navigation.navigate("Show", { id: item.id })}
//                         >
//                             <View style={styles.row}>
//                                 <Text style={styles.title}>
//                                     {item.title} #{item.id}
//                                 </Text>
//                                 <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
//                                     <Feather style={styles.icon} name="trash" />
//                                 </TouchableOpacity>
//                             </View>
//                         </TouchableOpacity>
//                     );
//                 }} */}
//       {/* /> */}
//     </View>
//   );
// };

// IndexScreen.navigationOptions = ({ navigation }) => {
//   return {
//     // headerRight: (
//     //   <TouchableOpacity onPress={() => navigation.navigate("Create")}>
//     //     <Feather name="plus" size={30} />
//     //   </TouchableOpacity>
//     // )
//   };
// };

// const styles = StyleSheet.create({
//   // row: {
//   //     flexDirection: "row",
//   //     justifyContent: "space-between",
//   //     paddingVertical: 20,
//   //     paddingHorizontal: 10,
//   //     borderTopWidth: 1,
//   //     borderColor: "gray"
//   // },
//   // title: {
//   //     fontSize: 18
//   // },
//   // icon: {
//   //     fontSize: 24
//   // }
// });

export default IndexScreen;
