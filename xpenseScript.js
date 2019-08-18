// press ctrl + d to select all the similar values to be edited
        
        // get the heading element 
        const headingEl= document.querySelector("#headingTotal") ;
        const tableEl= document.querySelector("#expenseTable") ;

       //get refrence to input description
       const inputDescEl = document.querySelector("#inputDesc") ;

        //get refrence to input amount
       const element1 = document.querySelector("#inputAmount") ;


        var allExpense = [] ; // array of all expenses 
        // variable for total expense 
        let totalExpense=0 ;
        
        // On button click add inputAmount to totalExpense 
        function addExpenseToTotal()
        {
            //creating an object of expenseItem
            const expenseItem={} ;

            //read input value from inputAmount
            const textAmount = element1.value ;

            //read Description from inputDescEl
            const textDesc = inputDescEl.value ;

            // convert it to number 
            const expense = parseInt(textAmount,10); //  second parameter to specify number system used

            //asign value to object variable
            expenseItem.desc=textDesc
            expenseItem.amount=expense
            expenseItem.moment=new Date()

            console.clear()

            //push that object to the allExpense array
            allExpense.push(expenseItem)

            console.table(allExpense)
            // init expense to zero
            
            

            // Add that value to totalExpense
            totalExpense += expense ;
            console.log({ totalExpense })

            // print total Expense on heading h1
            var printTotal = `Total is : ${totalExpense}`  // ( ` ) This sign is present below esc on keyboard
            headingEl.textContent = printTotal ; 

            renderList(allExpense)
        }

        function getDateString(momento)
        {
            return momento.toLocaleDateString('en-US',{
                year: 'numeric' ,
                month : 'long' ,
                day : 'numeric'
            })
        }

        //controller function

        //Delete Item
        function deleteItem(dateValue1)
        {  // To declare a global variable we use window.variableName 
            window.dateValue = dateValue1
           //controller function
        //    function findDate(date)
        //    {
        //        console.log(date.moment.valueOf())
        //        console.log(dateValue)
        //        if(date.moment.valueOf() === dateValue)
        //        {
        //             console.log('value deleted')
        //            return false 
                   
        //        }
        //        else
        //        {return true}
        //    }
           
            var newArr=[]  ;
           
            for(i=0;i<allExpense.length;i++)
            {
                if(allExpense[i].moment.valueOf() !== dateValue)
                {   
                    
                    newArr.push(allExpense[i].valueOf()) ;
                    
                }
                else
                {
                    totalExpense -= allExpense[i].amount  ;
                }
                
            }
            console.table(allExpense)
            renderList(newArr)
            allExpense=newArr
            console.table(allExpense)

            printTotal = `Total is : ${totalExpense}`  // ( ` ) This sign is present below esc on keyboard
            headingEl.textContent = printTotal ;
        }

        // function to display new list 
        function renderList(arrOfList){
            const allExpenseHTML = arrOfList.map(expense => createList(expense) ) ;
            // now allExpenseHTML is a array so we need to join array
            const finalTable=allExpenseHTML.join("") 

            //Assigning tableEL the value 
            tableEl.innerHTML = finalTable ;
            finalTable1 = finalTable ;

        }

        // ViewLayer
        function createList({desc,amount,moment})
        {
            return `<div>
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between">
                    <div class="d-flex flex-column">
                        ${desc}
                        <small class="text-muted">${getDateString(moment)}</small>
                    </div>
                    <div>
                        <span class="px-5">
                        ${amount} ₹ 
                        </span>
                        <button type="button" 
                        class="btn btn-outline-danger btn-sm" 
                        onclick="deleteItem(${moment.valueOf()})" >
                            <i class="fas fa-trash-alt"></i>
                              

                        </button>
                    </div>
                </li> </div>` 
        }
        // get the button element 
        const element = document.querySelector("#btnAddExpense") ;
        console.log(element) ;

        // Listen to click event 
        element.addEventListener("click",addExpenseToTotal,false) ;
        

        