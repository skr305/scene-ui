import moment from "moment"
import { SECONDS_PRECISION } from "./time-format"
const standErrorMessage = ( errorCode: number, message: string = "" ) => {
    return `
errorCode: ${ errorCode }, in ${ moment( new Date() ).format( SECONDS_PRECISION ) }
message: ${ message.length ? message : " NO_MESSAGE " } 
    `;
}
export default standErrorMessage;