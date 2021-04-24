import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import platform from '../../../../native-base-theme/variables/platform';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { FastField } from 'formik';
import UploadFile from '../../../modules/shared/upload/upload';
import ProfileIcon from '../../../../assets/icons/popular/profile.svg';
import { LinearGradient } from 'expo-linear-gradient';
import PlusSVG from 'assets/icons/popular/plus.svg';
import ItemShowImage from '../items/ItemShowImage';
class ImagesFormItemNotFast extends Component {
  state = {
    loading: false,
    previewVisible: false,
    previewImage: '',
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  schema = () => {
    return {
      ...this.props.schema,
      image: true,
    };
  };

  value = () => {
    const { value } = this.props;

    if (!value) {
      return [];
    }

    return Array.isArray(value) ? value : [value];
  };

  fileList = () => {
    return this.value().map((item) => ({
      uid: item.id || undefined,
      name: item.name,
      status: 'done',
      url: item.publicUrl,
    }));
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url,
      previewVisible: true,
    });
  };

  handleSuccess = (file) => {
    this.setState({ loading: false });
    this.props.onChange([...this.value(), file]);
  };

  handleError = (error) => {
    this.setState({ loading: false });
    Errors.showMessage(error);
  };

  handleRemove = (id) => {
    this.props.onChange(this.value().filter((item) => item.id !== id));
  };

  handleChange = (file) => {
    if (!file || !file.file || !file.file.status) {
      return;
    }

    if (file.file.status === 'removed') {
      this.handleRemove(file.file.uid);
    } else {
      this.setState({ loading: true });
    }
  };

  validate = (file) => {
    try {
      FileUploader.validate(file, this.schema());
      return true;
    } catch (error) {
      this.handleError(error);
      return false;
    }
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async (handleChange) => {
    const { name, form, path } = this.props;
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        result.path = path;
        result.fileName = result.uri.split('/').slice(-1).pop();

        form.setFieldValue(name, result);

        // let Image = await UploadFile.uploadFromRequest(response);

        // this.setState({ avatar: Image, loading: false, showButton: true });
        // this.handleSavePicture();
      }
    } catch (E) {
      console.log(E);
    }
  };

  render() {
    const { previewVisible, previewImage } = this.state;

    const {
      label,
      name,
      form,
      hint,
      layout,
      path,
      schema,
      max,
      formItemProps,
      inputProps,
      required,
      values,
      mode,

      scroll,
    } = this.props;
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          paddingTop: scroll ? platform.getResponsiveHeight(3) : 0,
          paddingBottom: scroll ? platform.getResponsiveHeight(3) : 0,

          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 2,
        }}
      >
        <TouchableOpacity onPress={() => this._pickImage(form)}>
          <View style={{}}>
            {values ? (
              <ItemShowImage
                style={{
                  width: platform.normalize(80),
                  height: platform.normalize(80),
                  borderRadius: 100,
                  borderWidth: platform.getRelativeWidth(2),
                  borderColor: platform.brandPrimary,
                }}
                mode={mode}
                source={values}
              />
            ) : (
              <LinearGradient
                colors={['#645AFF', '#A573FF']}
                style={{
                  width: platform.getRelativeHeight(87),
                  height: platform.getRelativeHeight(87),
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ProfileIcon />
              </LinearGradient>
            )}
          </View>

          <View
            style={{
              width: platform.circleSize(70),
              height: platform.circleSize(70),
              borderRadius: 100,
              backgroundColor: platform.brandInfo,
              position: 'absolute',
              bottom: 0,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PlusSVG />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class ImagesUploader extends Component {
  render() {
    return (
      <FastField name={this.props.name}>
        {({ field, form, meta }) => (
          <ImagesFormItemNotFast {...this.props} form={form} />
        )}
      </FastField>
    );
  }
}

export default ImagesUploader;
