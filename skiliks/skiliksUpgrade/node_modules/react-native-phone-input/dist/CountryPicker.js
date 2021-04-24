"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const picker_1 = require("@react-native-picker/picker");
const country_1 = __importDefault(require("./country"));
const styles_1 = __importDefault(require("./styles"));
const PickerItem = picker_1.Picker.Item;
class CountryPicker extends react_1.Component {
    constructor(props) {
        super(props);
        this.onPressCancel = () => {
            if (this.props.onPressCancel) {
                this.props.onPressCancel();
            }
            this.setState({
                modalVisible: false,
            });
        };
        this.onPressSubmit = () => {
            if (this.props.onPressConfirm) {
                this.props.onPressConfirm();
            }
            if (this.props.onSubmit) {
                this.props.onSubmit(this.state.selectedCountry);
            }
            this.setState({
                modalVisible: false,
            });
        };
        this.onValueChange = (selectedCountry) => {
            this.setState({
                selectedCountry,
            });
        };
        this.state = {
            buttonColor: this.props.buttonColor || '#007AFF',
            modalVisible: false,
            selectedCountry: this.props.selectedCountry || country_1.default.getAll()[0],
        };
    }
    componentDidUpdate() {
        const { selectedCountry } = this.props;
        if (selectedCountry && selectedCountry !== this.state.selectedCountry) {
            this.setState({
                selectedCountry: this.props.selectedCountry,
            });
        }
    }
    selectCountry(selectedCountry) {
        this.setState({
            selectedCountry,
        });
    }
    show() {
        this.setState({
            modalVisible: true,
        });
    }
    // eslint-disable-next-line class-methods-use-this
    renderItem(country, index) {
        return react_1.default.createElement(PickerItem, { key: country.iso2, value: country.iso2, label: country.name });
    }
    render() {
        const { buttonColor } = this.state;
        const itemStyle = this.props.itemStyle || {};
        return (react_1.default.createElement(react_native_1.Modal, { animationType: "slide", transparent: true, visible: this.state.modalVisible, onRequestClose: () => {
                console.log('Country picker has been closed.');
            } },
            react_1.default.createElement(react_native_1.View, { style: styles_1.default.basicContainer },
                react_1.default.createElement(react_native_1.View, { style: [
                        styles_1.default.modalContainer,
                        { backgroundColor: this.props.pickerBackgroundColor || 'white' },
                    ] },
                    react_1.default.createElement(react_native_1.View, { style: styles_1.default.buttonView },
                        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: this.onPressCancel },
                            react_1.default.createElement(react_native_1.Text, { style: [{ color: buttonColor }, this.props.cancelTextStyle] }, this.props.cancelText || 'Cancel')),
                        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: this.onPressSubmit },
                            react_1.default.createElement(react_native_1.Text, { style: [{ color: buttonColor }, this.props.confirmTextStyle] }, this.props.confirmText || 'Confirm'))),
                    react_1.default.createElement(react_native_1.View, { style: styles_1.default.mainBox },
                        react_1.default.createElement(picker_1.Picker, { ref: (ref) => {
                                this.picker = ref;
                            }, style: styles_1.default.bottomPicker, selectedValue: this.state.selectedCountry, onValueChange: (country) => this.onValueChange(country), itemStyle: itemStyle, mode: "dialog" }, country_1.default.getAll().map((country, index) => this.renderItem(country, index))))))));
    }
}
exports.default = CountryPicker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ291bnRyeVBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Db3VudHJ5UGlja2VyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBeUM7QUFDekMsK0NBRXNCO0FBQ3RCLHdEQUFxRDtBQUVyRCx3REFBZ0M7QUFDaEMsc0RBQThCO0FBRzlCLE1BQU0sVUFBVSxHQUFHLGVBQU0sQ0FBQyxJQUFJLENBQUM7QUFFL0IsTUFBcUIsYUFBYyxTQUFRLGlCQUF1RTtJQUc5RyxZQUFZLEtBQUs7UUFDYixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUF5QmpCLGtCQUFhLEdBQUcsR0FBRyxFQUFFO1lBQ2pCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDOUI7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNWLFlBQVksRUFBRSxLQUFLO2FBQ3RCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUVELGtCQUFhLEdBQUcsR0FBRyxFQUFFO1lBQ2pCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDL0I7WUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ25EO1lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixZQUFZLEVBQUUsS0FBSzthQUN0QixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFFRCxrQkFBYSxHQUFHLENBQUMsZUFBZSxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixlQUFlO2FB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RyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0NBQ1QsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7NEJBQ3RCLENBQUMsRUFDRCxLQUFLLEVBQUUsZ0JBQU0sQ0FBQyxZQUFZLEVBQzFCLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFDekMsYUFBYSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUN2RCxTQUFTLEVBQUUsU0FBUyxFQUNwQixJQUFJLEVBQUMsUUFBUSxJQUVaLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FDckUsQ0FDTixDQUNKLENBQ0osQ0FDSCxDQUNYLENBQUM7SUFDTixDQUFDO0NBQ0o7QUExSEQsZ0NBMEhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gICAgVGV4dCwgVG91Y2hhYmxlT3BhY2l0eSwgVmlldywgTW9kYWwsXG59IGZyb20gJ3JlYWN0LW5hdGl2ZSc7XG5pbXBvcnQgeyBQaWNrZXIgfSBmcm9tICdAcmVhY3QtbmF0aXZlLXBpY2tlci9waWNrZXInO1xuXG5pbXBvcnQgQ291bnRyeSBmcm9tICcuL2NvdW50cnknO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3N0eWxlcyc7XG5pbXBvcnQgeyBSZWFjdE5hdGl2ZUNvdW50cnlQaWNrZXJQcm9wcywgUmVhY3ROYXRpdmVDb3VudHJ5UGlja2VyU3RhdGUgfSBmcm9tICcuL3R5cGluZ3MnO1xuXG5jb25zdCBQaWNrZXJJdGVtID0gUGlja2VyLkl0ZW07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvdW50cnlQaWNrZXIgZXh0ZW5kcyBDb21wb25lbnQ8UmVhY3ROYXRpdmVDb3VudHJ5UGlja2VyUHJvcHMsIFJlYWN0TmF0aXZlQ291bnRyeVBpY2tlclN0YXRlPiB7XG4gICAgcHJpdmF0ZSBwaWNrZXI6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYnV0dG9uQ29sb3I6IHRoaXMucHJvcHMuYnV0dG9uQ29sb3IgfHwgJyMwMDdBRkYnLFxuICAgICAgICAgICAgbW9kYWxWaXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHNlbGVjdGVkQ291bnRyeTogdGhpcy5wcm9wcy5zZWxlY3RlZENvdW50cnkgfHwgQ291bnRyeS5nZXRBbGwoKVswXSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgc2VsZWN0ZWRDb3VudHJ5IH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZENvdW50cnkgJiYgc2VsZWN0ZWRDb3VudHJ5ICE9PSB0aGlzLnN0YXRlLnNlbGVjdGVkQ291bnRyeSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENvdW50cnk6IHRoaXMucHJvcHMuc2VsZWN0ZWRDb3VudHJ5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RDb3VudHJ5KHNlbGVjdGVkQ291bnRyeSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkQ291bnRyeSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25QcmVzc0NhbmNlbCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25QcmVzc0NhbmNlbCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblByZXNzQ2FuY2VsKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIG1vZGFsVmlzaWJsZTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uUHJlc3NTdWJtaXQgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uUHJlc3NDb25maXJtKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uUHJlc3NDb25maXJtKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblN1Ym1pdCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh0aGlzLnN0YXRlLnNlbGVjdGVkQ291bnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIG1vZGFsVmlzaWJsZTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uVmFsdWVDaGFuZ2UgPSAoc2VsZWN0ZWRDb3VudHJ5KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWRDb3VudHJ5LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIG1vZGFsVmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICByZW5kZXJJdGVtKGNvdW50cnksIGluZGV4KSB7XG4gICAgICAgIHJldHVybiA8UGlja2VySXRlbSBrZXk9e2NvdW50cnkuaXNvMn0gdmFsdWU9e2NvdW50cnkuaXNvMn0gbGFiZWw9e2NvdW50cnkubmFtZX0gLz47XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGJ1dHRvbkNvbG9yIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBpdGVtU3R5bGUgPSB0aGlzLnByb3BzLml0ZW1TdHlsZSB8fCB7fTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxNb2RhbFxuICAgICAgICAgICAgICAgIGFuaW1hdGlvblR5cGU9XCJzbGlkZVwiXG4gICAgICAgICAgICAgICAgdHJhbnNwYXJlbnRcbiAgICAgICAgICAgICAgICB2aXNpYmxlPXt0aGlzLnN0YXRlLm1vZGFsVmlzaWJsZX1cbiAgICAgICAgICAgICAgICBvblJlcXVlc3RDbG9zZT17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ291bnRyeSBwaWNrZXIgaGFzIGJlZW4gY2xvc2VkLicpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFZpZXcgc3R5bGU9e3N0eWxlcy5iYXNpY0NvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxWaWV3XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlcy5tb2RhbENvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5waWNrZXJCYWNrZ3JvdW5kQ29sb3IgfHwgJ3doaXRlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgc3R5bGU9e3N0eWxlcy5idXR0b25WaWV3fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VG91Y2hhYmxlT3BhY2l0eSBvblByZXNzPXt0aGlzLm9uUHJlc3NDYW5jZWx9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17W3sgY29sb3I6IGJ1dHRvbkNvbG9yIH0sIHRoaXMucHJvcHMuY2FuY2VsVGV4dFN0eWxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jYW5jZWxUZXh0IHx8ICdDYW5jZWwnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ub3VjaGFibGVPcGFjaXR5PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRvdWNoYWJsZU9wYWNpdHkgb25QcmVzcz17dGhpcy5vblByZXNzU3VibWl0fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e1t7IGNvbG9yOiBidXR0b25Db2xvciB9LCB0aGlzLnByb3BzLmNvbmZpcm1UZXh0U3R5bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNvbmZpcm1UZXh0IHx8ICdDb25maXJtJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVG91Y2hhYmxlT3BhY2l0eT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgc3R5bGU9e3N0eWxlcy5tYWluQm94fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGlja2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17KHJlZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXIgPSByZWY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuYm90dG9tUGlja2VyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFZhbHVlPXt0aGlzLnN0YXRlLnNlbGVjdGVkQ291bnRyeX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25WYWx1ZUNoYW5nZT17KGNvdW50cnkpID0+IHRoaXMub25WYWx1ZUNoYW5nZShjb3VudHJ5KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVN0eWxlPXtpdGVtU3R5bGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU9XCJkaWFsb2dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge0NvdW50cnkuZ2V0QWxsKCkubWFwKChjb3VudHJ5LCBpbmRleCkgPT4gdGhpcy5yZW5kZXJJdGVtKGNvdW50cnksIGluZGV4KSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9QaWNrZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XG4gICAgICAgICAgICAgICAgICAgIDwvVmlldz5cbiAgICAgICAgICAgICAgICA8L1ZpZXc+XG4gICAgICAgICAgICA8L01vZGFsPlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==