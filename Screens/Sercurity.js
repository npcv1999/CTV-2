import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {theme} from '../constants';
import Block from '../Component/Block';
import Text from '../Component/Text';
export default class Sercurity extends Component {
  render() {
    return (
      <Block
        padding={[theme.sizes.padding * 2, theme.sizes.padding]}
        space="between">
        <Text h1 light>
          Chính sách bảo mật
        </Text>
        <ScrollView>
          <Text
            caption
            black
            height={24}
            style={{marginBottom: theme.sizes.base}}>
            1. Khi sử dụng dịch vụ của chúng tôi, bạn tin tưởng cung cấp thông
            tin của bạn cho chúng tôi. Chúng tôi hiểu rằng đây là một trách
            nhiệm lớn và chúng tôi nỗ lực bảo vệ thông tin của bạn cũng như để
            bạn nắm quyền kiểm soát.
          </Text>
          <Text
            caption
            black
            height={24}
            style={{marginBottom: theme.sizes.base}}>
            2. Chính sách bảo mật này nhằm mục đích giúp bạn hiểu rõ những thông
            tin chúng tôi thu thập, lý do chúng tôi thu thập và cách bạn có thể
            cập nhật, quản lý, xuất và xóa thông tin của mình.
          </Text>
          <Text
            caption
            black
            height={24}
            style={{marginBottom: theme.sizes.base}}>
            3. Khi tạo một Tài khoản Google, bạn cung cấp cho chúng tôi thông
            tin cá nhân bao gồm tên của bạn và mật khẩu. Bạn cũng có thể chọn
            thêm số điện thoại hoặc thông tin thanh toán vào tài khoản của mình.
            Ngay cả khi không đăng nhập vào Tài khoản Google, bạn vẫn có thể
            chọn cung cấp cho chúng tôi thông tin như địa chỉ email để nhận
            thông tin cập nhật về dịch vụ của chúng tôi.
          </Text>
          <Text
            caption
            black
            height={24}
            style={{marginBottom: theme.sizes.base}}>
            4. Chúng tôi thu thập thông tin để cung cấp các dịch vụ tốt hơn cho
            tất cả người dùng của mình — từ việc xác định những thông tin cơ bản
            như ngôn ngữ mà bạn nói cho đến những thông tin phức tạp hơn như
            quảng cáo nào bạn sẽ thấy hữu ích nhất, những người quan trọng nhất
            với bạn khi trực tuyến hay những video nào trên YouTube mà bạn có
            thể thích. Thông tin Google thu thập và cách thông tin đó được sử
            dụng tùy thuộc vào cách bạn dùng các dịch vụ của chúng tôi cũng như
            cách bạn quản lý các tùy chọn kiểm soát bảo mật của mình.
          </Text>
          <Text
            caption
            black
            height={24}
            style={{marginBottom: theme.sizes.base}}>
            5. Một số các Dịch vụ của chúng tôi có sẵn trên các thiết bị di
            động. Không sử dụng các Dịch vụ đó theo cách khiến bạn bị mất tập
            trung và ngăn cản bạn tuân thủ các luật về an toàn hoặc giao thông.
          </Text>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({});
