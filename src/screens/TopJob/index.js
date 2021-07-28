import React, {useState, useEffect} from 'react';

import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import Swiper from 'react-native-swiper';

import BaseUrl from '../../db/BaseUrl';
import colors from '../../utils/colors';

import styles from './style';

import {ActivityIndicator} from 'react-native-paper';

const TopJob = () => {
  const [newJob, setNewJob] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = BaseUrl.baseUrl + 'devwork_new.json';
  const fetchData = async () => {
    await fetch(url)
      .then(res => res.json())
      .then(json => {
        setNewJob(Object.values(json).splice(0, 10));
        setLoading(false);
      });
  };
  //Call api
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{marginBottom: -20}}>
      <View style={styles.viewLabelNew}>
        <Image
          style={{width: 32, height: 32, marginRight: 5}}
          resizeMode="contain"
          source={require('../../images/new.png')}></Image>
        <Text style={styles.txtLabel}>Top việc làm mới</Text>
      </View>
      <View style={{height: 250}}>
        {!loading ? (
          <Swiper autoplay autoplayTimeout={4} activeDotColor={colors.cyan}>
            {newJob.map((item, index) => {
              return (
                <View key={index} style={styles.viewItem}>
                  <TouchableOpacity
                    style={styles.viewItem}
                    onPress={() => {
                      Linking.openURL(item.href);
                    }}>
                    <Image
                      style={{width: 100, height: 100}}
                      source={{uri: item.logo}}
                      resizeMode="contain"></Image>

                    <Text style={styles.txtJob} numberOfLines={3}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </Swiper>
        ) : (
          <ActivityIndicator animating={true} color={colors.cyan} />
        )}
      </View>
    </View>
  );
};

export default TopJob;
