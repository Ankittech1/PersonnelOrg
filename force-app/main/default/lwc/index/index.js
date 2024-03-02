import { LightningElement } from 'lwc';

export default class Index extends LightningElement {
     taskname="";
    taskdate=null;
    incompletetask=[];
    completetask=[];

    resethandleClick(event)
    {
        this.taskname="";
        this.taskdate=null;
    }
    addhandleClick()
    {
        
       
       if(!this.taskdate)
       {
        this.taskdate=new Date().toISOString().slice(0,10);
       }
       if(this.validateTask())
       {
        console.log("this.taskname",this.taskname);
        console.log("this.taskname",this.taskdate);
        this.incompletetask=[...this.incompletetask,
            {
                taskname:this.taskname,
                taskdate:this.taskdate
            }

    ];
        this.resethandleClick();
      let sortedarraylist =this.sortTask(this.incompletetask);
      console.log("this.incompletetask",sortedarraylist)
        this.incompletetask=[...sortedarraylist];
         console.log("this.incompletetask",this.incompletetask);
       }
       
    
}
    sortTask(inputArr)
    {
        let sortedArray=inputArr.sort((a,b)=>{
            const dateA=new Date(a.taskdate);
            const dateB=new Date(b.taskdate);
            return dateA-dateB;
        });
        return sortedArray;
    }
    validateTask()
    {
        let isvalidate=true;
        console.log("isvalidate",isvalidate)
         let element=this.template.querySelector(".InputName");
        //if my task name is Empty then
        if(!this.taskname)
        {
            isvalidate=false;
        }
        else{
           let taskitem= this.incompletetask.find(
            (currentItem)=> currentItem.taskname===this.taskname && currentItem.taskdate===this.taskdate);
        if(taskitem)
        {
            isvalidate=false;
           element.setCustomValidity("Task Is Already Available");
        }
        }
        if(isvalidate)
        {
            element.setCustomValidity("");
        }
        element.reportValidity();
        return isvalidate;
        

        
    }

    onchangeHandler(event)
    {
        
        console.log("event.target",event.target);
         let {name,value}=event.target;
         console.log("name",name)
         if(name==="taskname")
         {
            this.taskname=value;
         }
         else if(name==="taskdate")
         {
            this.taskdate=value;
         }
         console.log("taskname",this.taskname);
         console.log("taskdate",this.taskdate);
    }

    removalHandler(event)
    {
        let index=event.target.name;
        this.incompletetask.splice(index,1);
        let sortedarraylist =this.sortTask(this.incompletetask);
      console.log("this.incompletetask",sortedarraylist)
        this.incompletetask=[...sortedarraylist];
    }
    CompleteHandler(event)
    {
        let index=event.target.name;
        this.refreshData(index);
       
       
    }

    dragStartHandler(event)
    {
        event.dataTransfer.setData("index",event.target.dataset.it);
    }
    allowDrop(event)
    {
        event.preventDefault();
    }
    dropElementHandler(event)
    {
        let index=event.dataTransfer.getData("index");
        this.refreshData(index);
    }

    refreshData(index)
    {
        let removeItem=this.incompletetask.splice(index,1);
        this.completetask=[...this.completetask,removeItem[0]];
        console.log("this.completetask",this.completetask);
        if(this.incompletetask.length>0){
             let sortedarraylist =this.sortTask(this.incompletetask);
         console.log("this.incompletetask",sortedarraylist)
        this.incompletetask=[...sortedarraylist];
        }
    }
}