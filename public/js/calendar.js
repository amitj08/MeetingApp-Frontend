import 'bootstrap/dist/css/bootstrap.min.css';

const meeting1 = {
    name : "AWS Meeting" ,
    startTime : 1160 ,    //in minutes
    endTime : 1320 ,
    attendees : [ "abc@gmail.com", "xyz@gmail.com" ]
};

const meeting2 = {};


function createMeetingCard( meetingList, meeting, membersEmail ) {
    const name = meeting.name;
    let height , top;
    height = meeting.endTime-meeting.startTime;
    top = `${ (meeting.startTime+100) + 100}px`;
    //console.log()
    const meetingBlock = document.createElement( 'div' );
    meetingBlock.className = 'meeting-block';
    meetingBlock.style.top = top;
    meetingBlock.style.height = `${height}px`;

    const meetingContent = document.createElement( 'div' );
    meetingContent.style.maxHeight = `${height - 5}px`;
    meetingContent.style.overflowY = 'hidden';

    meetingContent.innerHTML = `   <div class="text-bold">${name}</div>
            <hr>

            <div>Attendees: ${membersEmail} </div>
        `;  
    
    meetingBlock.appendChild(meetingContent);
    meetingList.appendChild(meetingBlock);    
};

function showCalendar( meeting ) {
    const meetingsList = document.getElementById( 'meeting-1' );
    // meetingsList.innerHTML = '';
    
    if ( meeting.length === 0 ) {
        // this.alert.showInfoMessage( 'No calender events on the selected date', 2 );
    } else {
        // this.alert.showInfoMessage( 'Loading Events', 2 );
    }
  
    /*
    for ( const meeting of meetings ) {
        let membersEmail = '';
        for ( const member of meeting.attendees ) {
            membersEmail += `${member.email}, `;
        }
        
    }
    */
    membersEmail="abc@example.com, xyz@example.com";
    createMeetingCard( meetingsList, meeting, membersEmail );

};

showCalendar( meeting1);

