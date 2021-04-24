"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const google_libphonenumber_1 = __importDefault(require("google-libphonenumber"));
const country_1 = __importDefault(require("./country"));
const phoneUtil = google_libphonenumber_1.default.PhoneNumberUtil.getInstance();
const asYouTypeFormatter = google_libphonenumber_1.default.AsYouTypeFormatter;
class PhoneNumber {
    // eslint-disable-next-line class-methods-use-this
    getAllCountries() {
        return country_1.default.getAll();
    }
    getDialCode(number) {
        let dialCode = '';
        // only interested in international numbers (starting with a plus)
        if (number.charAt(0) === '+') {
            let numericChars = '';
            // iterate over chars
            for (let i = 0; i < number.length; i++) {
                const c = number.charAt(i);
                // if char is number
                if (this.isNumeric(c)) {
                    numericChars += c;
                    // if current numericChars make a valid dial code
                    // if (this.countryCodes[numericChars]) {
                    if (country_1.default.getCountryCodes()[numericChars]) {
                        // store the actual raw string (useful for matching later)
                        dialCode = number.substr(0, i + 1);
                    }
                    // longest dial code is 4 chars
                    if (numericChars.length === 4) {
                        break;
                    }
                }
            }
        }
        return dialCode;
    }
    // eslint-disable-next-line class-methods-use-this
    getNumeric(str) {
        return str.replace(/\D/g, '');
    }
    // eslint-disable-next-line class-methods-use-this
    isNumeric(n) {
        return !Number.isNaN(parseFloat(n)) && Number.isFinite(Number(n));
    }
    getCountryCodeOfNumber(number) {
        const dialCode = this.getDialCode(number);
        const numeric = this.getNumeric(dialCode);
        const countryCode = country_1.default.getCountryCodes()[numeric];
        // countryCode[0] can be null -> get first element that is not null
        if (countryCode) {
            return lodash_1.default.first(countryCode.filter((iso2) => iso2));
        }
        return '';
    }
    // eslint-disable-next-line class-methods-use-this
    parse(number, iso2) {
        try {
            return phoneUtil.parse(number, iso2);
        }
        catch (err) {
            console.log(`Exception was thrown: ${err.toString()}`);
            return null;
        }
    }
    isValidNumber(number, iso2) {
        const phoneInfo = this.parse(number, iso2);
        if (phoneInfo) {
            return phoneUtil.isValidNumber(phoneInfo);
        }
        return false;
    }
    // eslint-disable-next-line class-methods-use-this
    format(number, iso2) {
        const formatter = new asYouTypeFormatter(iso2); // eslint-disable-line new-cap
        let formatted;
        number.replace(/-/g, '')
            .replace(/ /g, '')
            .replace(/\(/g, '')
            .replace(/\)/g, '')
            .split('')
            .forEach((n) => {
            formatted = formatter.inputDigit(n);
        });
        return formatted;
    }
    getNumberType(number, iso2) {
        const phoneInfo = this.parse(number, iso2);
        const type = phoneInfo ? phoneUtil.getNumberType(phoneInfo) : -1;
        return lodash_1.default.findKey((numType, noType) => noType === type);
    }
    // eslint-disable-next-line class-methods-use-this
    getCountryDataByCode(iso2) {
        return country_1.default.getCountryDataByCode(iso2);
    }
}
exports.default = new PhoneNumber();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvbmVOdW1iZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcGhvbmVOdW1iZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQXVCO0FBQ3ZCLGtGQUFtRDtBQUVuRCx3REFBZ0M7QUFJaEMsTUFBTSxTQUFTLEdBQUcsK0JBQWMsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDL0QsTUFBTSxrQkFBa0IsR0FBRywrQkFBYyxDQUFDLGtCQUFrQixDQUFDO0FBRTdELE1BQU0sV0FBVztJQUNiLGtEQUFrRDtJQUNsRCxlQUFlO1FBQ1gsT0FBTyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxXQUFXLENBQUMsTUFBTTtRQUNkLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNsQixrRUFBa0U7UUFDbEUsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUMxQixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDdEIscUJBQXFCO1lBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixvQkFBb0I7Z0JBQ3BCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDbkIsWUFBWSxJQUFJLENBQUMsQ0FBQztvQkFDbEIsaURBQWlEO29CQUNqRCx5Q0FBeUM7b0JBQ3pDLElBQUksaUJBQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRTt3QkFDekMsMERBQTBEO3dCQUMxRCxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFD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LENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRSxPQUFPLGdCQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxrREFBa0Q7SUFDbEQsb0JBQW9CLENBQUMsSUFBSTtRQUNyQixPQUFPLGlCQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUNKO0FBRUQsa0JBQWUsSUFBSSxXQUFXLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbGliUGhvbmVOdW1iZXIgZnJvbSAnZ29vZ2xlLWxpYnBob25lbnVtYmVyJztcblxuaW1wb3J0IENvdW50cnkgZnJvbSAnLi9jb3VudHJ5JztcbmltcG9ydCBjb3VudHJpZXMgZnJvbSAnLi9yZXNvdXJjZXMvY291bnRyaWVzLmpzb24nOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuaW1wb3J0IG51bWJlclR5cGUgZnJvbSAnLi9yZXNvdXJjZXMvbnVtYmVyVHlwZS5qc29uJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcblxuY29uc3QgcGhvbmVVdGlsID0gbGliUGhvbmVOdW1iZXIuUGhvbmVOdW1iZXJVdGlsLmdldEluc3RhbmNlKCk7XG5jb25zdCBhc1lvdVR5cGVGb3JtYXR0ZXIgPSBsaWJQaG9uZU51bWJlci5Bc1lvdVR5cGVGb3JtYXR0ZXI7XG5cbmNsYXNzIFBob25lTnVtYmVyIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuICAgIGdldEFsbENvdW50cmllcygpIHtcbiAgICAgICAgcmV0dXJuIENvdW50cnkuZ2V0QWxsKCk7XG4gICAgfVxuXG4gICAgZ2V0RGlhbENvZGUobnVtYmVyKSB7XG4gICAgICAgIGxldCBkaWFsQ29kZSA9ICcnO1xuICAgICAgICAvLyBvbmx5IGludGVyZXN0ZWQgaW4gaW50ZXJuYXRpb25hbCBudW1iZXJzIChzdGFydGluZyB3aXRoIGEgcGx1cylcbiAgICAgICAgaWYgKG51bWJlci5jaGFyQXQoMCkgPT09ICcrJykge1xuICAgICAgICAgICAgbGV0IG51bWVyaWNDaGFycyA9ICcnO1xuICAgICAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIGNoYXJzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGMgPSBudW1iZXIuY2hhckF0KGkpO1xuICAgICAgICAgICAgICAgIC8vIGlmIGNoYXIgaXMgbnVtYmVyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmljKGMpKSB7XG4gICAgICAgICAgICAgICAgICAgIG51bWVyaWNDaGFycyArPSBjO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBjdXJyZW50IG51bWVyaWNDaGFycyBtYWtlIGEgdmFsaWQgZGlhbCBjb2RlXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLmNvdW50cnlDb2Rlc1tudW1lcmljQ2hhcnNdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDb3VudHJ5LmdldENvdW50cnlDb2RlcygpW251bWVyaWNDaGFyc10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBhY3R1YWwgcmF3IHN0cmluZyAodXNlZnVsIGZvciBtYXRjaGluZyBsYXRlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxDb2RlID0gbnVtYmVyLnN1YnN0cigwLCBpICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gbG9uZ2VzdCBkaWFsIGNvZGUgaXMgNCBjaGFyc1xuICAgICAgICAgICAgICAgICAgICBpZiAobnVtZXJpY0NoYXJzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpYWxDb2RlO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgZ2V0TnVtZXJpYyhzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXEQvZywgJycpO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgaXNOdW1lcmljKG4pIHtcbiAgICAgICAgcmV0dXJuICFOdW1iZXIuaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgTnVtYmVyLmlzRmluaXRlKE51bWJlcihuKSk7XG4gICAgfVxuXG4gICAgZ2V0Q291bnRyeUNvZGVPZk51bWJlcihudW1iZXIpIHtcbiAgICAgICAgY29uc3QgZGlhbENvZGUgPSB0aGlzLmdldERpYWxDb2RlKG51bWJlcik7XG4gICAgICAgIGNvbnN0IG51bWVyaWMgPSB0aGlzLmdldE51bWVyaWMoZGlhbENvZGUpO1xuICAgICAgICBjb25zdCBjb3VudHJ5Q29kZSA9IENvdW50cnkuZ2V0Q291bnRyeUNvZGVzKClbbnVtZXJpY107XG5cbiAgICAgICAgLy8gY291bnRyeUNvZGVbMF0gY2FuIGJlIG51bGwgLT4gZ2V0IGZpcnN0IGVsZW1lbnQgdGhhdCBpcyBub3QgbnVsbFxuICAgICAgICBpZiAoY291bnRyeUNvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBfLmZpcnN0KGNvdW50cnlDb2RlLmZpbHRlcigoaXNvMjogYW55KSA9PiBpc28yKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICBwYXJzZShudW1iZXIsIGlzbzIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBwaG9uZVV0aWwucGFyc2UobnVtYmVyLCBpc28yKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRXhjZXB0aW9uIHdhcyB0aHJvd246ICR7ZXJyLnRvU3RyaW5nKCl9YCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzVmFsaWROdW1iZXIobnVtYmVyLCBpc28yKSB7XG4gICAgICAgIGNvbnN0IHBob25lSW5mbyA9IHRoaXMucGFyc2UobnVtYmVyLCBpc28yKTtcblxuICAgICAgICBpZiAocGhvbmVJbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4gcGhvbmVVdGlsLmlzVmFsaWROdW1iZXIocGhvbmVJbmZvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuICAgIGZvcm1hdChudW1iZXIsIGlzbzIpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gbmV3IGFzWW91VHlwZUZvcm1hdHRlcihpc28yKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuZXctY2FwXG4gICAgICAgIGxldCBmb3JtYXR0ZWQ7XG5cbiAgICAgICAgbnVtYmVyLnJlcGxhY2UoLy0vZywgJycpXG4gICAgICAgICAgICAucmVwbGFjZSgvIC9nLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXCgvZywgJycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwpL2csICcnKVxuICAgICAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAgICAgLmZvckVhY2goKG46IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZCA9IGZvcm1hdHRlci5pbnB1dERpZ2l0KG4pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZDtcbiAgICB9XG5cbiAgICBnZXROdW1iZXJUeXBlKG51bWJlciwgaXNvMikge1xuICAgICAgICBjb25zdCBwaG9uZUluZm8gPSB0aGlzLnBhcnNlKG51bWJlciwgaXNvMik7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBwaG9uZUluZm8gPyBwaG9uZVV0aWwuZ2V0TnVtYmVyVHlwZShwaG9uZUluZm8pIDogLTE7XG4gICAgICAgIHJldHVybiBfLmZpbmRLZXkoKG51bVR5cGUsIG5vVHlwZSkgPT4gbm9UeXBlID09PSB0eXBlKTtcbiAgICB9XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuICAgIGdldENvdW50cnlEYXRhQnlDb2RlKGlzbzIpIHtcbiAgICAgICAgcmV0dXJuIENvdW50cnkuZ2V0Q291bnRyeURhdGFCeUNvZGUoaXNvMik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgUGhvbmVOdW1iZXIoKTtcbiJdfQ==