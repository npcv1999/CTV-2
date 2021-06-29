import React, {Component, useContext} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Block from '../Component/Block';
import Button1 from '../Component/Button1';
import {theme} from '../constants';
import Text from '../Component/Text';
import ButtonSocial from './Social';

const {width, height} = Dimensions.get('window');
class Welcome extends Component {
  scrollX = new Animated.Value(0);

  constructor(props) {
    super(props);

    this.state = {
      showTerms: false,
      sliderIndex: 0,
      maxSlider: 2,
    };
  }

  setRef = (c) => {
    this.listRef = c;
  };

  scrollToIndex = (index, animated) => {
    this.listRef && this.listRef.scrollToIndex({index, animated});
  };

  UNSAFE_componentWillMount() {
    setInterval(
      function () {
        const {sliderIndex, maxSlider} = this.state;
        let nextIndex = 0;

        if (sliderIndex < maxSlider) {
          nextIndex = sliderIndex + 1;
        }

        this.scrollToIndex(nextIndex, true);
        this.setState({sliderIndex: nextIndex});
      }.bind(this),
      4000,
    );
  }

  renderTermsService() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showTerms}
        onRequestClose={() => this.setState({showTerms: false})}>
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between">
          <Text h2 light>
            Điều khoản sử dụng
          </Text>

          <ScrollView style={{marginVertical: theme.sizes.padding}}>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              1. Bạn phải tuân thủ mọi chính sách đã cung cấp cho bạn trong phạm
              vi Dịch vụ.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              2. Không được sử dụng trái phép Dịch vụ của chúng tôi. Ví dụ:
              không được gây trở ngại cho Dịch vụ của chúng tôi hoặc tìm cách
              truy cập chúng bằng phương pháp nào đó không thông qua giao diện
              và hướng dẫn mà chúng tôi cung cấp. Bạn chỉ có thể sử dụng Dịch vụ
              của chúng tôi theo như được luật pháp cho phép, bao gồm cả các
              luật và quy định hiện hành về quản lý xuất khẩu và tái xuất khẩu.
              Chúng tôi có thể tạm ngừng hoặc ngừng cung cấp Dịch vụ của chúng
              tôi cho bạn nếu bạn không tuân thủ các điều khoản hoặc chính sách
              của chúng tôi hoặc nếu chúng tôi đang điều tra hành vi bị nghi ngờ
              là sai phạm.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              3. Việc bạn sử dụng Dịch vụ của chúng tôi không có nghĩa là bạn
              được sở hữu bất cứ các quyền sở hữu trí tuệ nào đối với Dịch vụ
              của chúng tôi hoặc nội dung mà bạn truy cập. Bạn không được sử
              dụng nội dung từ Dịch vụ của chúng tôi trừ khi bạn được chủ sở hữu
              nội dung đó cho phép hoặc được luật pháp cho phép. Các điều khoản
              này không cấp cho bạn quyền sử dụng bất kỳ thương hiệu hoặc lôgô
              nào được sử dụng trong Dịch vụ của chúng tôi. Không được xóa, che
              khuất hoặc thay đổi bất kỳ thông báo pháp lý nào được hiển thị
              trong hoặc kèm theo Dịch vụ của chúng tôi.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              4. Liên quan đến việc bạn sử dụng Dịch vụ, chúng tôi có thể gửi
              cho bạn các thông báo dịch vụ, thông báo quản trị và thông tin
              khác. Bạn có thể chọn không nhận một số thông báo này.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              5. Một số các Dịch vụ của chúng tôi có sẵn trên các thiết bị di
              động. Không sử dụng các Dịch vụ đó theo cách khiến bạn bị mất tập
              trung và ngăn cản bạn tuân thủ các luật về an toàn hoặc giao
              thông.
            </Text>
          </ScrollView>

          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button1 gradient onPress={() => this.setState({showTerms: false})}>
              <Text center white>
                Tôi đã đọc & đồng ý
              </Text>
            </Button1>
          </Block>
        </Block>
      </Modal>
    );
  }

  renderIllustrations() {
    const {illustrations} = this.props;
    return (
      <FlatList
        ref={this.setRef}
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({item}) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{width, height: height / 2.5, overflow: 'visible'}}
          />
        )}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: this.scrollX}},
            },
          ],
          {useNativeDriver: false},
        )}
      />
    );
  }

  renderSteps() {
    const {illustrations} = this.props;
    const stepPosition = Animated.divide(this.scrollX, width);
    return (
      <Block row center middle style={styles.stepsContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color="gray"
              style={[styles.steps, {opacity}]}
            />
          );
        })}
      </Block>
    );
  }
  //google api

  render() {
    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h1 center bold>
            Cổng
            <Text h1 primary>
              TìmViệc
            </Text>
          </Text>
          <Text
            h3
            gray3
            style={{
              marginTop: theme.sizes.padding / 2,
              marginBottom: theme.sizes.padding,
            }}>
            Tìm việc nhanh chóng
          </Text>
        </Block>
        <Block center middle>
          {this.renderIllustrations()}
          {this.renderSteps()}
        </Block>

        <Block middle flex={0.5} margin={[1, theme.sizes.padding * 2]}>
          {/* Login =======================================================*/}
          <ButtonSocial></ButtonSocial>

          <Button1 onPress={() => this.setState({showTerms: true})}>
            <Text center caption gray>
              Điều khoản sử dụng
            </Text>
          </Button1>
        </Block>
        {this.renderTermsService()}
      </Block>
    );
  }
}

Welcome.defaultProps = {
  illustrations: [
    {id: 1, source: require('../src/images/enterprise.png')},
    {id: 2, source: require('../src/images/job.png')},
    {id: 3, source: require('../src/images/information.png')},
  ],
};

export default Welcome;

const styles = StyleSheet.create({
  stepsContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
});
