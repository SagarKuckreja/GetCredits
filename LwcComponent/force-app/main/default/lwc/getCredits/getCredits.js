import { LightningElement, track } from 'lwc';
import getAndParse from '@salesforce/apex/Controller.getAndParse';
const COLS = [
{ label: 'Creditor', fieldName: 'creditorName', type:'text' },
{ label: 'First Name', fieldName: 'firstName', type: 'text'},
{ label: 'Last Name', fieldName: 'lastName', type: 'text'},
{ label: 'Min Payment %', fieldName: 'minPaymentPercentage', type: 'percentage'},
{ label: 'Balance', fieldName: 'balance', type: 'currency'}
];

export default class GetCredits extends LightningElement {
cols=COLS;
sfsdata = [];
TotalRows;
addBalance;
TotalSelectedRows;
cName;
fName;
lName;
minPay;
bal;
Idstack=[];
checkedRow;
@track customFormModal = false;  
  
connectedCallback(){
getAndParse()
    .then(result => {
        this.sfsdata = JSON.parse(result);
        this.TotalRows = this.sfsdata.length;
        //JSON.parse(this.SFSData);
        console.log(this.sfsdata);
    });
}

customShowModalPopup() {            
this.customFormModal = true;
}

customHideModalPopup() {    

this.customFormModal = false;
}
selectedRows(event){
let totalAmount = 0;
let totalRowsSelected =0;
this.checkedRow=event.detail.selectedRows;
for(let obj of event.detail.selectedRows){
    totalAmount += obj.balance;
    totalRowsSelected +=1;
}
this.addBalance =totalAmount;
this.TotalSelectedRows = totalRowsSelected;
}
addRowInTable(){
    let objArray= [];
    let Object={creditorName:this.cName,firstName: this.fName,lastName:this.lName,minPaymentPercentage:this.minPay,balance:this.bal, id:this.generateId(100, 1)}

    objArray.push(...this.sfsdata,Object);
    this.sfsdata=objArray;
    this.totalRows = this.sfsdata.length;
    this.customFormModal = false;
}
changeCreditor(event){
    this.cName = event.target.value;
    }
    changeFirstName(event){
        console.log('event.target.value' +event.target.value);
        this.fName = event.target.value;
        }
    changeLastName(event){
        this.lName = event.target.value;
        }
    changeMinPayment(event){
        this.minPay = event.target.value;
        }
    changeBalance(event){
        this.bal = event.target.value;
        }
    generateId(max, min){
        var num = Math.floor(Math.random() * (max - min + 1)) + min;
        return (this.Idstack.includes(num)) ? this.generateId(min, max) : num;
    }
    handleRemoveDebt() {
        let tempArray = this.sfsdata;
       for(var obj of this.checkedRow){
            tempArray = tempArray.filter(function(obj1) {return obj1.id !== obj.id});
       }
       console.log("temparray" + tempArray);
        this.sfsdata = tempArray;
    }
}