const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');
const clearButton = document.getElementById('clearLapsBtn');

const lapList=document.getElementById('laplist');

//Stopwatch variables

let minutes=0;
let seconds=0;
let milliseconds=0;
let interval;

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
clearButton.addEventListener('click', reloadLaps);



function startTimer()
{
    interval=setInterval(updateTimer,10); // Call the function updateTimer every 10ms
    startButton.disabled=true; //Disable the start button after it was pressed
}

function stopTimer() // Reset the timer and save the lap time
{
    clearInterval(interval);
    addToLapList();
    resetTimerData();
    startButton.disabled=false;

}

function pauseTimer()
{
    clearInterval(interval); //Stop setInterval -> Stop incrementing the timer
    startButton.disabled=false;
}

function resetTimer()
{
    clearInterval(interval);
    resetTimerData();
    resetButton.disabled=false;
    startButton.disabled=false;
}

function reloadLaps()
{
    clearInterval(interval);
    resetTimerData();
    removeLaps();
    startButton.disabled=false;

}

function updateTimer()
{
    milliseconds++;
    if(milliseconds === 100)
    { 
        milliseconds=0;
        seconds++;

        if(seconds === 60)
        {
            seconds=0;
            minutes++;
        }
    }

    displayTimer();
    
}

function displayTimer()
{
    millisecondsLabel.textContent = padTime(milliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);
}

function padTime(time)
{
    //Ensure the string is 2 characters long. If not, add a '0' in front.
    return time.toString().padStart(2,'0'); 
}

function resetTimerData()
{
    minutes=0;
    seconds=0;
    milliseconds=0;
    displayTimer();
}

function addToLapList()
{
    const lapTime=`${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span> Lap ${lapList.childElementCount + 1}:  </span> ${lapTime}`;
    lapList.appendChild(listItem);
}

function removeLaps()
{
    lapList.innerHTML = '';
}