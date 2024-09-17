import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

const BookFlightScreen = () => {
  const [tripType, setTripType] = useState("oneWay");
  const [passengerCount, setPassengerCount] = useState(1);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const renderForm = () => {
    switch (tripType) {
      case "oneWay":
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>From</Text>
              <TextInput
                style={styles.input}
                placeholder="From"
                placeholderTextColor="#808080"
                defaultValue="Tokyo, Japan"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>To</Text>
              <TextInput
                style={styles.input}
                placeholder="To"
                placeholderTextColor="#808080"
                defaultValue="Dec 16th, 2024"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Journey Date</Text>
              <TextInput
                style={styles.input}
                placeholder="Journey Date"
                placeholderTextColor="#808080"
                defaultValue="Agu 16 2024"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Passenger</Text>
              <View style={styles.passengerInputContainer}>
                <FontAwesome5 name="user" size={20} color="#808080" />
                <TouchableOpacity
                  style={styles.passengerInput}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.passengerInputText}>{`${adultCount} Adult, ${childCount} Child, ${infantCount} Infant`}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        );
      case "roundTrip":
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>From</Text>
              <TextInput
                style={styles.input}
                placeholder="From"
                placeholderTextColor="#808080"
                defaultValue="Tokyo, Japan"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>To</Text>
              <TextInput
                style={styles.input}
                placeholder="To"
                placeholderTextColor="#808080"
                defaultValue="Dec 16th, 2024"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Journey Date</Text>
              <TextInput
                style={styles.input}
                placeholder="Journey Date"
                placeholderTextColor="#808080"
                defaultValue="Agu 16 2024"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Return Date</Text>
              <TextInput
                style={styles.input}
                placeholder="Return Date"
                placeholderTextColor="#808080"
                defaultValue="Agu 16 2024"
              />
            </View>
             <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Passenger</Text>
              <View style={styles.passengerInputContainer}>
                <FontAwesome5 name="user" size={20} color="#808080" />
                <TouchableOpacity
                  style={styles.passengerInput}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.passengerInputText}>{`${adultCount} Adult, ${childCount} Child, ${infantCount} Infant`}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        );
      case "multiCity":
        return (
          <>
           <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>From</Text>
              <TextInput
                style={styles.input}
                placeholder="From"
                placeholderTextColor="#808080"
                defaultValue="Tokyo, Japan"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>To</Text>
              <TextInput
                style={styles.input}
                placeholder="To"
                placeholderTextColor="#808080"
                defaultValue="Tokyo, Japan"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Departure</Text>
              <TextInput
                style={styles.input}
                placeholder="Journey Date"
                placeholderTextColor="#808080"
                defaultValue="16 Aug 2024"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>From</Text>
              <TextInput
                style={styles.input}
                placeholder="Return Date"
                placeholderTextColor="#808080"
                defaultValue="Agu 16 2024"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>To</Text>
              <TextInput
                style={styles.input}
                placeholder="Return Date"
                placeholderTextColor="#808080"
                defaultValue="Agu 16 2024"
              />
            </View>
             <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Passenger</Text>
              <View style={styles.passengerInputContainer}>
                <FontAwesome5 name="user" size={20} color="#808080" />
                <TouchableOpacity
                  style={styles.passengerInput}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.passengerInputText}>{`${adultCount} Adult, ${childCount} Child, ${infantCount} Infant`}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  const renderPassengerModal = () => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Passengers</Text>

          {renderPassengerControl("Adults", adultCount, setAdultCount)}
          {renderPassengerControl("Children", childCount, setChildCount)}
          {renderPassengerControl("Infants", infantCount, setInfantCount)}

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderPassengerControl = (label, count, setCount) => (
    <View style={styles.passengerControlContainer}>
      <Text style={styles.passengerLabel}>{label}</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => setCount(count > 0 ? count - 1 : 0)}
        >
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{count}</Text>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={["#FCFCFE", "#8B93DB"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <FontAwesome5 name="chevron-left" size={24} color="#000" />
          <Text style={styles.title}>Select Your Flight</Text>
        </View>
        <View style={styles.scrollViews}>
          <Image
            source={require("@/assets/images/airplane.png")}
            style={styles.banner}
          />
        </View>

        <View style={styles.radioButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              tripType === "oneWay" && styles.selectedRadioButton,
            ]}
            onPress={() => setTripType("oneWay")}
          >
            <Text
              style={[
                styles.radioButtonText,
                tripType === "oneWay" && styles.selectedRadioButtonText,
              ]}
            >
              One way
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              tripType === "roundTrip" && styles.selectedRadioButton,
            ]}
            onPress={() => setTripType("roundTrip")}
          >
            <Text
              style={[
                styles.radioButtonText,
                tripType === "roundTrip" && styles.selectedRadioButtonText,
              ]}
            >
              Round Trip
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              tripType === "multiCity" && styles.selectedRadioButton,
            ]}
            onPress={() => setTripType("multiCity")}
          >
            <Text
              style={[
                styles.radioButtonText,
                tripType === "multiCity" && styles.selectedRadioButtonText,
              ]}
            >
              Multi City
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>{renderForm()}</View>

        <TouchableOpacity style={styles.button}>
          <Link href="./FlightShow" style={styles.buttonText}>
            SEARCH FLIGHTS
          </Link>
        </TouchableOpacity>

        {renderPassengerModal()}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    marginTop:16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    marginLeft:20
    
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  banner: {
    marginTop: 14,
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  scrollViews: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  radioButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  radioButton: {
    backgroundColor: "#FFF",
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 12,
  },
  radioButtonText: {
    fontSize: 20,
    color: "#000",
  },
  selectedRadioButton: {
    backgroundColor: "#3E75D6",
  },
  selectedRadioButtonText: {
    color: "#FFF",
  },
  formContainer: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  inputContainer: {
    marginVertical: 10,
  },
  inputLabel: {
    fontSize: 20,
    color: "#000",
    marginBottom: 5,
  },
  input: {
     flexDirection: "row",
    height: 50,
    borderColor: "#3B82F6",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
  passengerInputContainer: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    borderColor: "#3B82F6",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
  passengerInput: {
    marginLeft: 10,
  },
  passengerInputText: {
    fontSize: 20,
    color: "#000",
  },
  button: {
    backgroundColor: "#0000FF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 40,
    marginHorizontal: 20,
    marginBottom:40
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  passengerControlContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  passengerLabel: {
    fontSize: 18,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    padding: 18,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  counterValue: {
    marginHorizontal: 15,
    fontSize: 20,
  },
  modalButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#0000FF",
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BookFlightScreen;
