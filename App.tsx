import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, FlatList, Image, Alert, Modal, TextInput, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import data from './data.json';
import { User, userData } from './user-data';
import { Searchbar } from 'react-native-paper';
import { Badge } from 'react-native-elements'
import {
  useFonts,
  IBMPlexSansThaiLooped_100Thin,
  IBMPlexSansThaiLooped_200ExtraLight,
  IBMPlexSansThaiLooped_300Light,
  IBMPlexSansThaiLooped_400Regular,
  IBMPlexSansThaiLooped_500Medium,
  IBMPlexSansThaiLooped_600SemiBold,
  IBMPlexSansThaiLooped_700Bold,
} from '@expo-google-fonts/ibm-plex-sans-thai-looped';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setNewUser] = useState<User[]>(userData);
  const [name, setName] = useState('');

  const createUser = () => {
    if (!name) {
      Alert.alert('Error', 'This field is required');
      return;
    }

    const addingUser: User = {
      id: Date.now(), // To generate a unique id (optional)
      name,
      age: 0,
    };

    setNewUser([...users, addingUser])
    setModalVisible(false);
    setName('');
  };

  let [fontsLoaded] = useFonts({
    IBMPlexSansThaiLooped_100Thin,
    IBMPlexSansThaiLooped_200ExtraLight,
    IBMPlexSansThaiLooped_300Light,
    IBMPlexSansThaiLooped_400Regular,
    IBMPlexSansThaiLooped_500Medium,
    IBMPlexSansThaiLooped_600SemiBold,
    IBMPlexSansThaiLooped_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      // Setting Background Color
      <LinearGradient 
          colors={['#abcdef', '#fedcba']} 
          style={styles.container_bg}
      >

        {/* Top Navbar */}
        <View style={styles.topNav}>
          <Text id='Navitator' style={styles.navigator}>
          <Image source={require('./assets/Logo.png')} style={styles.itemLogo}/>

          {/* Logo and menu */}
          <Text 
            style={styles.mainButton} 
          >
            <Image source={require('./assets/Home Icon.png')} style={styles.mainTextButton}/>
            หน้าหลัก
          </Text>

          <Image source={require('./assets/Next Icon.png')} style={styles.nextTextButton}/>

          <Text 
            style={styles.plannedButton} 
          >
            วางแผนการเงิน
          </Text>
          </Text>

          {/* User Profile and notifications */}
          <Text id='about-user' style={{ alignItems: 'flex-end' }}>
            <View>
              <Image source={require('./assets/pirate cat.png')} style={styles.profileImage}/>
              <Badge
                status="primary"
                containerStyle={{ position: 'absolute', top: 32, right: 9 }}
              />
            </View>

            <Text style={styles.textFontRegular}>ไกด์ เงินเพิ่มพูน<Image source={require('./assets/Dropdown Icon.png')} style={[styles.Button, { marginLeft: 5 }]}/></Text>

            <View style={{ marginRight: 5 }}>
              <Image source={require('./assets/Notification Text.png')} style={[styles.profileImage]}/>

              <Badge
                status="error"
                value="34"
                containerStyle={{ position: 'absolute', top: 20, right: -4 }}
              />
            </View>
          </Text>
        </View>
        {/* End Top Navbar */}

        {/* Customer Page */}
        <View style={styles.container_item}>
        <View style={styles.container_init}>
          {/* Header */}
          <View style={styles.container_box}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.title]}>
                <Image source={require('./assets/Next Icon.png')} style={{ marginRight: 10, transform: [{rotate: '180deg'}] }}/>
                กรอกชื่อลูกค้าที่จะวางแผนการเงิน
              </Text>
              <Text 
                style={[styles.Button, { textAlign: 'right', fontSize: 12, marginTop: 4 }]} 
                onPress={() => setModalVisible(true)}
              >
                <Image source={require('./assets/Add Icon.png')} style={styles.addTextButton}/>
                เพิ่ม
              </Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Searchbar
                placeholder=""
                onChangeText={setSearchQuery}
                value={searchQuery}
                icon={()=>
                  <Image source={require('./assets/smile.png')} 
                          style={{ height: 10, width: 10, alignSelf: 'center', position: "absolute" }}
                  />}
                style={styles.searchbar}
                inputStyle={{minHeight: 0}}
              />
            </View>
            
            {/* New Customer Section */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Text style={styles.itemText}>ลูกค้าใหม่ / ข้อมูลไม่ครบถ้วน</Text>
              </View>
              <View style={{flex: 1, height: 1, backgroundColor: 'grey', marginLeft: 10}} />
            </View>

            <FlatList
              data={users}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  
                  <Text style={[styles.itemContainer]}>
                    <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
                      <Image source={require('./assets/Customer Icon.png')} style={styles.userImage}/>
                      <Text style={[styles.itemText, { marginLeft: 10 }]}>
                        {item.name}
                      </Text>
                    </View>
                  </Text>
                  
                  <Text 
                    style={[styles.userButton, { textAlign: 'right', fontSize: 12, marginTop: 4, width: 120, color: 'white' }]} 
                    onPress={() => setModalVisible(true)}
                  >
                    <Image source={require('./assets/Arrow Icon.png')} style={styles.userTextButton}/>
                    เริ่มวางแผน
                  </Text>
                </View>
              )}
            />

            {/* Planning Section */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Text style={styles.itemText}>วางแผนการเงิน</Text>
              </View>
              <View style={{flex: 1, height: 1, backgroundColor: 'grey', marginLeft: 10}} />
            </View>

            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  
                  <Text style={[styles.itemContainer]}>
                    <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
                      <Image source={require('./assets/pompom.png')} style={styles.userImage}/>
                      <Text style={[styles.itemText, { marginLeft: 10 }]}>
                        {item.name}
                      </Text>
                    </View>
                  </Text>
                  
                  <Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 235 }}>
                      <Text 
                        style={[styles.Button, { fontSize: 12, color: '#1F87AA', marginTop: 4 }]} 
                      >
                        <Image source={require('./assets/Write Icon.png')} style={[styles.addTextButton]}/>
                        แก้ไขแผน
                      </Text>

                      <Text 
                        style={[styles.userButton, { textAlign: 'right', fontSize: 12, marginTop: 4, width: 140, color: 'white' }]} 
                        onPress={() => setModalVisible(true)}
                      >
                        <Image source={require('./assets/Info Icon.png')} style={styles.userTextButton}/>
                        ดูสรุปแผนการเงิน
                      </Text>
                    </View>
                  </Text>
                </View>
              )}
            />
          </View>
          
        </View>
        </View>
        {/* End Customer Page */}

        {/* Adding New User Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)} 
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={styles.title}>เพิ่มลูกค้า</Text>
              <Text 
                style={[styles.Button, { textAlign: 'right', fontSize: 12, marginTop: 4 }]} 
                onPress={() => setModalVisible(false)}
              >
                X
              </Text>
            </View>

              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />

              <View style={[styles.modalButtons, { justifyContent: 'center' }]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 235 }}>
                      <Text 
                        onPress={() => setModalVisible(false)}
                        style={[styles.closeButton, { fontSize: 12, color: '#1F87AA', marginTop: 4, textAlign: 'center' }]} 
                      >
                        ปิด
                      </Text>

                      <Text 
                        style={[styles.userButton, { textAlign: 'center', fontSize: 12, marginTop: 4, width: 130, color: 'white' }]} 
                        onPress={createUser}
                      >
                        <Image source={require('./assets/check.png')} style={styles.userTextButton}/>
                        บันทึก
                      </Text>
                  </View>
              </View>
            </View>
          </View>
        </Modal>
        {/* End Adding New User Modal */}
      </LinearGradient>
    );
  }

}

const styles = StyleSheet.create({
  textFontRegular: {
    fontFamily: 'IBMPlexSansThaiLooped_400Regular'
  },
  textFontBold: {
    fontFamily: 'IBMPlexSansThaiLooped_700Bold'
  },
  container_bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: Platform.OS === 'web' ? 20 : 10,
  },
  container_item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: Platform.OS === 'web' ? 20 : 10,
  },
  container_init: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '90%',
    borderRadius: 10
  },
  container_box: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: Platform.OS === 'web' ? 20 : 10,
  },
  text: {
    fontFamily: 'IBMPlexSansThaiLooped_100Thin',
    fontSize: Platform.OS === 'web' ? 24 : 20,
  },
  title: {
    fontFamily: 'IBMPlexSansThaiLooped_400Regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F87AA'
  },
  itemContainer: {
    fontFamily: 'IBMPlexSansThaiLooped_100Thin',
    padding: 5,
    marginBottom: 5,
    borderRadius: 8,
    width: '100%',
  },
  itemText: {
    fontFamily: 'IBMPlexSansThaiLooped_400Regular',
    fontSize: 14,
    marginBottom: 5,
  },
  itemLogo: { 
    borderWidth: 1,
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: 'transparent',
    height: 50,
    width: 100,
    resizeMode: 'contain'
  },
  itemMenu: { 
    borderWidth: 1,
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: 'transparent',
    height: 50,
    width: 100,
    resizeMode: 'contain',
    marginLeft: 10
  },
  topNav: { 
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  navigator: { 
    justifyContent: 'space-between', 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    textAlign: 'center'
  },
  buttons: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  Button: {
    fontFamily: 'IBMPlexSansThaiLooped_400Regular',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  addTextButton: {
    borderWidth: 1,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderColor: 'transparent',
    height: 10,
    width: 20,
    resizeMode: 'contain',
    marginLeft: 10,
    fontSize: 10,
    fontFamily: 'IBMPlexSansThaiLooped_400Regular'
  },
  closeButton: {
    marginLeft: 20,
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    fontFamily: 'IBMPlexSansThaiLooped_400Regular'
  },
  nextTextButton: {
    borderWidth: 1,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    borderColor: 'transparent',
    height: 10,
    width: 20,
    resizeMode: 'contain',
    marginLeft: 7,
    marginTop: 20,
    fontSize: 10
  },
  accessButton: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  accessTextButton: {
    borderWidth: 1,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderColor: 'transparent',
    height: 10,
    width: 20,
    resizeMode: 'contain',
    marginLeft: 10,
    fontSize: 10
  },
  mainButton: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    textAlign: 'center', 
    fontSize: 12, 
    marginTop: 0, 
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginLeft: 10,
    borderRadius: 60,
    height: 30,
    width: 100,
  },
  mainTextButton: {
    borderWidth: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderColor: 'transparent',
    height: 10,
    width: 20,
    resizeMode: 'contain',
    fontSize: 10,
    marginTop: 10,
    fontFamily: 'IBMPlexSansThaiLooped_400Regular'
  },
  plannedButton: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    textAlign: 'center', 
    marginLeft: 5,
    borderRadius: 60,
    height: 30,
    width: 90,
    fontSize: 12,
    fontFamily: 'IBMPlexSansThaiLooped_400Regular'
  },
  userButton: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#1F87AA',
    padding: 10,
    width: 100,
    borderRadius: 4,
    fontFamily: 'IBMPlexSansThaiLooped_400Regular'
  },
  userTextButton: {
    borderWidth: 1,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderColor: 'transparent',
    height: 10,
    width: 20,
    resizeMode: 'contain',
    fontSize: 10,
    fontFamily: 'IBMPlexSansThaiLooped_400Regular'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 350,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    fontFamily: 'IBMPlexSansThaiLooped_400Regular',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  userImage: {
    borderWidth: 1,
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: 'transparent',
    height: 40,
    width: 40,
    resizeMode: 'contain',
    marginRight: 10,
    borderRadius: 5
  },
  profileImage: {
    borderWidth: 1,
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: 'transparent',
    height: 40,
    width: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  searchContainer: {
    width: '100%',
    height: 30,
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  searchbar: {
    backgroundColor: 'white',
    marginBottom: 10,
    alignItems: 'flex-start',
    fontFamily: 'IBMPlexSansThaiLooped_400Regular'
  },
});
