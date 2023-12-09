import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { DataStore, Storage } from "aws-amplify";
import uuid from "react-native-uuid";
import {
  ReferencesDetailNurse,
  NurseNotificationTable,
  NurseTable,
} from "../../../models";
import moment from "moment";
import { Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { sendNewPushNotification } from "../../../utils/notification";

const ReferenceScreen = (props) => {
  const { width, height } = Dimensions.get("window");

  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const id = props !== undefined && props?.route?.params?.data?.id;

  console.log(id);

  const [userDocument, setUserDocument] = useState(undefined);
  const [noShowModel, setNoShowModel] = useState(false);
  const [noShowMessage, setNoShowMessage] = useState("");
  const [referenceView, setReferenceView] = useState({
    reference_name: "",
    reference_relationship: "",
    reference_position: "",
    reference_date_complete: "",
    reference_email: "",
    reference_contact_number: "",
    reference_verified: false,
    reference_verified_comments: false,
    reference_file: "",
    reference_with_your_work_org: "",
    status: "",
  });

  const downloadAndOpenPDF = async (name) => {
    // Download the PDF file to the device's file system

    const response = await Storage.get(name, {
      level: "public/",
    });
    // const localUri = FileSystem.documentDirectory + "filename.pdf";

    // await FileSystem.writeAsStringAsync(localUri, response.Body, {
    //   encoding: FileSystem.EncodingType.Base64,
    // });
    // return localUri;
    Linking.openURL(response.toString());
  };

  useEffect(() => {
    setReferenceView({
      ...referenceView,
      reference_name: userDocument?.reference_name,
      reference_relationship: userDocument?.reference_relationship,
      reference_position: userDocument?.reference_position,
      reference_date_complete: moment(
        new Date(userDocument?.reference_date_complete)
      ),
      reference_email: userDocument?.reference_email,
      reference_contact_number: userDocument?.reference_contact_number,
      reference_verified: userDocument?.reference_verified,
      reference_verified_comments: userDocument?.reference_verified_comments,
      reference_file: userDocument?.reference_file,
      reference_with_your_work_org: userDocument?.reference_with_your_work_org,
      status: userDocument?.status,
    });
  }, [userDocument]);

  const updateData = async (value, status, message) => {
    if (noShowMessage === "") {
      Alert.alert("Fill the verification note");
    } else {
      try {
        const res = await DataStore.save(
          ReferencesDetailNurse.copyOf(userDocument, (updated) => {
            updated.reference_verified = value;
            updated.status = status;
            updated.reference_verified_comments = message;
          })
        );
        const data = await DataStore.query(NurseTable, (item) =>
          item.id.eq(res.nurseTableID)
        );
        setNoShowMessage("");
        setNoShowModel(false);
        await DataStore.save(
          new NurseNotificationTable({
            imageURL: "",
            title: "Reference Verification Status",
            content: "Your Reference is" + ` ${status}`,
            navigationScreen: "MyReferenceScreen",
            navigationData: {},
            visited: false,
            visitNotification: false,
            notificationDotTypeColor: "green",
            nurseTableID: res.nurseTableID,
            url: "",
          })
        );
        sendNewPushNotification({
          expoPushToken: data[0]?.mobileId,
          job: "Reference Verification Status",
          typeMessage: "Your Reference is" + ` ${status}`,
          screen: "MyReferenceScreen",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const check = async (id) => {
    setLoading(true);
    try {
      const data = await DataStore.query(ReferencesDetailNurse, (item) =>
        item.id.eq(id)
      );
      setUserDocument(data[0]);
      setLoading(false);
    } catch (error) {
      setUserDocument(null);
    }
  };

  useEffect(() => {
    check(id);
  }, [id]);

  //ReferencesDetailNurse Update
  useEffect(() => {
    const subscription = DataStore.observe(ReferencesDetailNurse, (item) =>
      item.id.eq(id)
    ).subscribe((msg) => {
      if (msg.model === ReferencesDetailNurse && msg.opType === "UPDATE") {
        check(id);
      }
    });

    return () => subscription.unsubscribe();
  }, [id]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={styles.container}>
            <View
              style={{
                justifyContent: "center",
                marginHorizontal: 20,
                marginTop: 5,
              }}
            >
              <View
                style={{
                  marginVertical: 5,
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderBottomWidth: 1.5,
                  borderBottomColor: "#f2f2f2",
                }}
              >
                <Text
                  style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
                >
                  Reference Name
                </Text>
                <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
                  {referenceView?.reference_name}
                </Text>
              </View>

              <View
                style={{
                  marginVertical: 5,
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderBottomWidth: 1.5,
                  borderBottomColor: "#f2f2f2",
                }}
              >
                <Text
                  style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
                >
                  Reference Relationship
                </Text>
                <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
                  {referenceView?.reference_relationship}
                </Text>
              </View>

              <View
                style={{
                  marginVertical: 5,
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderBottomWidth: 1.5,
                  borderBottomColor: "#f2f2f2",
                }}
              >
                <Text
                  style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
                >
                  Reference Email
                </Text>
                <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
                  {referenceView?.reference_email}
                </Text>
              </View>

              <View
                style={{
                  marginVertical: 5,
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderBottomWidth: 1.5,
                  borderBottomColor: "#f2f2f2",
                }}
              >
                <Text
                  style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
                >
                  Reference Contact Number
                </Text>
                <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
                  {referenceView?.reference_contact_number}
                </Text>
              </View>

              {referenceView.reference_file && (
                <View
                  style={{
                    marginVertical: 5,
                    justifyContent: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: "#1a1a1a",
                        fontWeight: "500",
                        fontSize: 15,
                      }}
                    >
                      Reference File
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#f2f2f2",
                      borderRadius: 5,
                      elevation: 1,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                      justifyContent: "space-between",
                    }}
                    onPress={() =>
                      downloadAndOpenPDF(referenceView.reference_file)
                    }
                  >
                    <Text
                      style={{
                        marginVertical: 10,
                        fontSize: 12,
                        color: "#8888",
                        marginHorizontal: 10,
                      }}
                    >
                      View the file
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {referenceView?.reference_verified_comments && (
                <View
                  style={{
                    marginVertical: 5,
                    justifyContent: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderBottomWidth: 1.5,
                    borderBottomColor: "#f2f2f2",
                  }}
                >
                  <Text
                    style={{
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: 15,
                    }}
                  >
                    Notes
                  </Text>
                  <Text
                    style={{ color: "#595959", fontSize: 12, marginTop: 5 }}
                  >
                    {referenceView?.reference_verified_comments}
                  </Text>
                </View>
              )}

              {referenceView.status === "waiting" ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    backgroundColor: "#2775BD",
                    borderRadius: 5,
                    padding: 10,
                    marginHorizontal: 10,
                    marginTop: 5,
                  }}
                  onPress={() => setNoShowModel(true)}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Verify
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  activeOpacity={0.5}
                  style={{
                    backgroundColor:
                      referenceView?.status === "Approved"
                        ? "#00b359"
                        : referenceView?.status === "Not Approved"
                        ? "red"
                        : "gray",
                    borderRadius: 5,
                    marginHorizontal: 10,
                    padding: 10,
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    {referenceView?.status}
                  </Text>
                </View>
              )}
            </View>

            <Modal
              animationType="fade"
              transparent={true}
              visible={noShowModel}
              onRequestClose={() => setNoShowModel(false)}
            >
              <View
                style={{
                  height: height,
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    paddingVertical: 15,
                    marginTop: 100,
                    width: 300,
                    justifyContent: "center",
                    elevation: 5,
                    paddingHorizontal: 10,
                    borderRadius: 15,
                    borderColor: "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        marginBottom: 5,
                        fontSize: 12,
                        color: "#737373",
                        marginHorizontal: 10,
                      }}
                    >
                      Verification Note <Text style={{ color: "red" }}>*</Text>
                    </Text>

                    <View
                      style={{
                        backgroundColor: "#f2f2f2",
                        borderRadius: 10,
                        elevation: 1,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 0.5,
                        borderColor: "#e6e6e6",
                        marginHorizontal: 10,
                        paddingRight: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <TextInput
                        style={{
                          width: "90%",
                          padding: 2,
                          paddingLeft: 5,
                          fontSize: 12,
                          color: "#737373",
                        }}
                        multiline
                        onChangeText={(text) => setNoShowMessage(text)}
                        value={noShowMessage}
                        keyboardType={"default"}
                        autoCapitalize="sentences"
                        placeholderTextColor="#b3b3b3"
                        placeholder={"Verification Message"}
                      />
                      <View
                        style={{
                          height: 40,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {noShowMessage ? (
                          <TouchableOpacity
                            onPress={() => setNoShowMessage("")}
                            style={{ marginLeft: 3 }}
                          >
                            <Ionicons
                              name="close-sharp"
                              size={22}
                              color="#808080"
                            />
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      flexDirection: "row",
                      marginTop: 20,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setNoShowModel(false);
                        setNoShowMessage("");
                      }}
                      style={{
                        backgroundColor: "#2775BD",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 10,
                        marginHorizontal: 10,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "right",
                          fontSize: 12,
                          color: "#fff",
                        }}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        updateData(false, "Not Approved", noShowMessage)
                      }
                      style={{
                        backgroundColor: "red",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 8,
                        marginRight: 10,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "right",
                          fontSize: 12,
                          color: "#fff",
                        }}
                      >
                        Not Approved
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        updateData(true, "Approved", noShowMessage)
                      }
                      style={{
                        backgroundColor: "#00b359",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "right",
                          fontSize: 12,
                          color: "#fff",
                        }}
                      >
                        Approve
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

export default ReferenceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
