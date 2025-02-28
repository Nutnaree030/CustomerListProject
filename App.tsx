import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, FlatList, Image, Alert, Modal, TextInput, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import data from './data.json';
import { User, userData } from './user-data';
import * as SplashScreen from 'expo-splash-screen';
import { Searchbar } from 'react-native-paper';
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

SplashScreen.preventAutoHideAsync();

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
      <LinearGradient 
          colors={['#abcdef', '#fedcba']} 
          style={styles.container_bg}
      >
        <View style={styles.topNav}>
          <Image source={require('./assets/Logo.png')} style={styles.itemLogo}/>
          {/* <Image source={require('./assets/Breadcrumb.png')} style={styles.itemMenu}/> */}
          <Text 
            style={[styles.mainButton, { textAlign: 'center', fontSize: 12, marginTop: 10 }]} 
          >
            <Image source={require('./assets/Home Icon.png')} style={styles.mainTextButton}/>
            หน้าหลัก
          </Text>

          <Image source={require('./assets/Next Icon.png')} style={[styles.nextTextButton]}/>

          <Text 
            style={[styles.plannedButton, { textAlign: 'center', fontSize: 12, marginTop: 15 }]} 
          >
            วางแผนการเงิน
          </Text>
        </View>

        <View style={styles.container_item}>
        <View style={styles.container_init}>

          <View style={styles.container_box}>
            {/* <Text>Open up App.tsx to start working on your app!</Text> */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.title]}>
                <Image source={require('./assets/Next Icon.png')} style={{ marginRight: 10, transform: [{rotate: '180deg'}] }}/>
                กรอกชื่อลูกค้าที่จะวางแผนการเงิน
              </Text>
              <Text 
                style={[styles.addButton, { textAlign: 'right', fontSize: 12, marginTop: 4 }]} 
                onPress={() => setModalVisible(true)}
              >
                <Image source={require('./assets/Add Icon.png')} style={styles.addTextButton}/>
                เพิ่ม
              </Text>
              {/* <Button title="Add User" onPress={() => setModalVisible(true)}/> */}
            </View>

            <View style={styles.searchContainer}>
              <Searchbar
                placeholder=""
                onChangeText={setSearchQuery}
                value={searchQuery}
                icon={()=><Image source={require('./assets/smile.png')} style={{ height: 10, width: 10, alignSelf: 'center', position: "absolute" }}/>}
                style={styles.searchbar}
                inputStyle={{minHeight: 0}}
              />
            </View>
            
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

                  {/* <Text style={[styles.itemText, { marginLeft: 10 }]}>
                    เริ่มวางแผน
                  </Text> */}

                
                </View>
              )}
            />


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
                        style={[styles.addButton, { fontSize: 12, color: '#1F87AA', marginTop: 4 }]} 
                      >
                        <Image source={require('./assets/Write Icon.png')} style={[styles.addTextButton]}/>
                        แก้ไขแผน
                      </Text>

                      <Text 
                        style={[styles.userButton, { textAlign: 'right', fontSize: 12, marginTop: 4, width: 130, color: 'white' }]} 
                        onPress={() => setModalVisible(true)}
                      >
                        <Image source={require('./assets/Info Icon.png')} style={styles.userTextButton}/>
                        ดูสรุปแผนการเงิน
                      </Text>
                    </View>
                  </Text>

                  {/* <Text style={[styles.itemText, { marginLeft: 10 }]}>
                    เริ่มวางแผน
                  </Text> */}

                
                </View>
              )}
            />
          </View>
          
        </View>
        </View>

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
                style={[styles.addButton, { textAlign: 'right', fontSize: 12, marginTop: 4 }]} 
                onPress={() => setModalVisible(false)}
              >
                X
              </Text>
              {/* <Button title="Add User" onPress={() => setModalVisible(true)}/> */}
            </View>
              {/* <Text style={{flexDirection: 'row-reverse', alignItems: 'flex-start', justifyContent: 'flex-end'}}>X</Text> */}
              {/* <Text style={styles.modalTitle}>เพิ่มลูกค้า</Text> */}

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
                {/* <Button title="ปิด" onPress={() => setModalVisible(false)} />
                <Button
                  title={'บันทึก'}
                  onPress={createUser}
                  color={'#1F87AA'}
                >
                  บันทึก
                </Button> */}
              </View>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    );
  }

}

const styles = StyleSheet.create({
  container_bg: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
    // marginTop: 30,
    borderRadius: 10
  },
  container_box: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
    // marginBottom: 20,
  },
  itemContainer: {
    fontFamily: 'IBMPlexSansThaiLooped_100Thin',
    padding: 5,
    marginBottom: 5,
    // backgroundColor: '#f4f4f4',
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
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  buttons: {
    // flexDirection: 'row',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    justifyContent: 'space-between',
  },
  addButton: {
    // flexDirection: 'row',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    justifyContent: 'space-between',
  },
  addTextButton: {
    borderWidth: 1,
    alignSelf: 'flex-end',
    // overflow: 'hidden',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: 'transparent',
    height: 10,
    width: 20,
    resizeMode: 'contain',
    marginLeft: 10,
    fontSize: 10
  },
  closeButton: {
    // flexDirection: 'row',
    marginLeft: 20,
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    justifyContent: 'space-between',
  },
  nextTextButton: {
    borderWidth: 1,
    alignSelf: 'flex-start',
    // overflow: 'hidden',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
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
    // flexDirection: 'row',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    justifyContent: 'space-between',
  },
  accessTextButton: {
    borderWidth: 1,
    alignSelf: 'flex-end',
    // overflow: 'hidden',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: 'transparent',
    height: 10,
    width: 20,
    resizeMode: 'contain',
    marginLeft: 10,
    fontSize: 10
  },
  mainButton: {
    // flexDirection: 'row',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginLeft: 10,
    borderRadius: 60,
    height: 30,
    width: 90,
  },
  mainTextButton: {
    borderWidth: 1,
    // alignSelf: 'flex-start',
    // overflow: 'hidden',
    alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: 'transparent',
    height: 10,
    width: 20,
    resizeMode: 'contain',
    // marginLeft: 10,
    fontSize: 10,
    marginTop: 10
  },
  plannedButton: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginLeft: 5,
    borderRadius: 60,
    height: 30,
    width: 90,
  },
  userButton: {
    // flexDirection: 'row',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#1F87AA',
    padding: 10,
    width: 100,
    borderRadius: 4
  },
  userTextButton: {
    borderWidth: 1,
    alignSelf: 'flex-end',
    // overflow: 'hidden',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: 'transparent',
    height: 10,
    width: 20,
    resizeMode: 'contain',
    fontSize: 10,
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
    alignItems: 'flex-start'
  },
});
