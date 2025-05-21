import { CATEGORY_OPTIONS, COLORS, TODO_TASK } from "@/constants/constants";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

export default function Index() {
  const [task, setTask] = useState(TODO_TASK);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const activeTask = task.filter((item) => !item.completed);
  const completedTask = task.filter((item) => item.completed);

const SaveTask = () => {
  if(!newTitle.trim()) return;
  const task = {
    id: Date.now().toString(),
    title: newTitle,
    icon: 'note-outline',
    time: format(time, "hh:mm a"),
    completed: false,
    date:format(date, "MMM dd, yyyy"),
    category: selectedCategory,
    notes
  };
  setTask((prev) => [task, ...prev]);
  setModalVisible(false);

  //reset the data
  setNewTitle("");
  setNotes("");
  setSelectedCategory(null);
  setDate(new Date());
  setTime(new Date());
}

  const toggleComplete = (id) => {
    setTask((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.todoSection}>
        <View style={styles.taskItem}>
          <View
            style={[
              styles.iconContainer,
              item.completed && { backgroundColor: COLORS.BG },
            ]}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={24}
              color={item.completed ? "#999" : COLORS.PRIMARY}
            />
          </View>
          <View style={styles.taskText}>
            <Text
              style={[
                styles.title,
                item.completed && {
                  textDecorationLine: "line-through",
                  color: "#999",
                },
              ]}
            >
              Task {item.title}
            </Text>
            <Text
              style={[
                styles.time,
                item.completed && {
                  textDecorationLine: "line-through",
                  color: "#999",
                },
              ]}
            >
              {item.time ? item.time : ""}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.checkbox,
              item.completed && {
                backgroundColor: COLORS.PRIMARY,
                borderColor: COLORS.PRIMARY,
              },
            ]}
            onPress={() => toggleComplete(item.id)}
          >
            {item.completed && (
              <Ionicons name="checkmark" size={16} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.behindComponent}>
        <Text style={styles.topDate}>06-06-2025</Text>
        <Text style={styles.topHeaderText}>My TODO LIST</Text>
        <View style={styles.circleContainer}>
          <View style={[styles.cirle, { marginLeft: -70 }]}></View>
          <View
            style={[styles.cirle, { marginRight: -70, marginTop: -100 }]}
          ></View>
        </View>
      </View>

      <FlatList
        data={TODO_TASK}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={() => null}
        ListHeaderComponent={() => (
          <View style={{ borderRadius: 12, backgroundColor: "#fff" }}>
            <FlatList
              data={activeTask}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.bottomListContainer}>
            <Text style={styles.completedText}>Completed Task</Text>
            <View style={{ borderRadius: 12, backgroundColor: "#fff" }}>
              <FlatList
                data={completedTask}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            </View>
          </View>
        )}
      />
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.curveHeader} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color={COLORS.PRIMARY} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add New Task</Text>
            <TextInput
              placeholder="Task Title"
              value={newTitle}
              onChangeText={setNewTitle}
              style={styles.input}
            />

            <Text style={styles.sectionLabel}>Category</Text>
            <View style={styles.categoryRow}>
              {CATEGORY_OPTIONS.map((cat) => {
                const selected = cat.id === selectedCategory;
                const IconComp =
                  cat.lib === "FontAwesome5"
                    ? FontAwesome5
                    : cat.lib === "Ionicons"
                    ? Ionicons
                    : MaterialCommunityIcons;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryCircle,
                      selected && {
                        backgroundColor: COLORS.PRIMARY,
                        borderColor: COLORS.PRIMARY,
                      },
                    ]}
                    onPress={() => setSelectedCategory(cat.id)}
                  >
                    <IconComp
                      name={cat.name}
                      size={24}
                      color={selected ? "#fff" : COLORS.PRIMARY}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.row}>
              <View style={styles.halfContainer}>
                <Text style={styles.sectionLabel}>Date</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.placeholderText}>
                    {format(date, "MMM dd, yyyy")}
                  </Text>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={24}
                    color={COLORS.GREY}
                  />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(e, d) => {
                      setShowDatePicker(false);
                      if (d) setDate(d);
                    }}
                  />
                )}
              </View>
              <View style={styles.halfContainer}>
                <Text style={styles.sectionLabel}>Time</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowTimePicker(true)}
                >
                  <Text style={styles.placeholderText}>
                    {format(time, "hh:mm a")}
                  </Text>
                  <Ionicons name="time-outline" size={22} color={COLORS.GREY} />
                </TouchableOpacity>
                {showTimePicker && (
                  <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={(e, d) => {
                      setShowTimePicker(false);
                      if (d) setTime(d);
                    }}
                  />
                )}
              </View>
            </View>
            <Text style={styles.sectionLabel}>Notes</Text>
            <TextInput
              placeholder="Add notes"
              multiline
              numberOfLines={4}
              style={[styles.input,styles.textarea]}
              value={notes}
              onChangeText={setNotes}
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={SaveTask}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add a new Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG,
  },
  behindComponent: {
    position: "absolute",
    width: "100%",
    height: 200,
    padding: 20,
    backgroundColor: COLORS.PRIMARY,
  },
  topDate: {
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
    marginBottom: 20,
  },
  topHeaderText: {
    fontSize: 30,
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  circleContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cirle: {
    width: 150,
    height: 150,
    borderWidth: 20,
    borderRadius: 75,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: COLORS.PRIMARY,
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    marginHorizontal: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    padding: 20,
    paddingTop: 120,
  },
  todoSection: {
    // marginTop: 16,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.BG_LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  time: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  completedText: { fontSize: 18, paddingVertical: 20, fontWeight: "600" },
  bottomListContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingVertical: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    padding: 24,
  },
  curveHeader: {
    height: 130,
    backgroundColor: COLORS.PRIMARY,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
  },
  input: {
    marginTop: 8,
    marginHorizontal: 20,
    backgroundColor: COLORS.BG_LIGHT,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionLabel: {
    marginTop: 16,
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  categoryRow: {
    flexDirection: "row",
    marginTop: 8,
    marginHorizontal: 20,
  },
  categoryCircle: {
    width: 38,
    height: 38,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfContainer: {
    flex: 1,
  },
  placeholderText: {
    color: COLORS.GREY,
  },
  textarea:{
    height: 100,
    textAlignVertical: "top",
  },
  saveButton:{
    backgroundColor: COLORS.PRIMARY,
    margin: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText:{
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  }
});
