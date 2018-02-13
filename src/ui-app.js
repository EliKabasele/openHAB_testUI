
/** 
    Script File using the openHAB-service.js- Library.
    Just for Test of (Library) methods call
*/


function fetch_All_Things () {
    openHAB_Object.getAllThings();
   
}

function fetch_A_Thing () {

    thing_UID = document.getElementById ('inputThing_UID').value;
    openHAB_Object.getOneSpecificThing (thing_UID);
    
}

function getState_value () {

    thing_UID = document.getElementById ('inputThing_UID').value;
    channel_ID = document.getElementById ('inputChannel_ID').value;

    openHAB_Object.getState_value (thing_UID, channel_ID);
    
}

function setState_value () {

    thing_UID = document.getElementById ('inputThing_UID').value;
    channel_ID = document.getElementById ('inputChannel_ID').value;
    state_value = document.getElementById ('inputState_value').value;

    openHAB_Object.sendCommand (thing_UID, channel_ID, state_value);
    openHAB_Object.setState_values (thing_UID, channel_ID, state_value);
}

/*
   ---------------- (COMMAND) LIGHT BUTTONS FUNCTIONS ---------------------

*/   

const _thinkLabel = "RemActLight", _channelLabel = "Farbe";

function btn_red ()  {
    let red = '360,100,100';
    
    openHAB_Object.sendCommand (_thinkLabel,  _channelLabel, red);
    openHAB_Object.setState_values (_thinkLabel,  _channelLabel, red);   
}

function btn_blue()  {
    let blue = '252,100,100';

    openHAB_Object.sendCommand (_thinkLabel,  _channelLabel, blue);
    openHAB_Object.setState_values (_thinkLabel,  _channelLabel, blue);
}

function btn_pink()  {

    let color = "305,80,100";
    
    openHAB_Object.sendCommand (_thinkLabel,  _channelLabel, color);
    openHAB_Object.setState_values (_thinkLabel,  _channelLabel, color);    
}

function btn_orange ()  {
    
    let color = "15,100,100";
    
    openHAB_Object.sendCommand (_thinkLabel,  _channelLabel, color);
    openHAB_Object.setState_values (_thinkLabel,  _channelLabel, color);
}

function btn_yellow ()  {
    

    let color = "59,82,100";
    
    openHAB_Object.sendCommand (_thinkLabel,  _channelLabel, color);
    openHAB_Object.setState_values (_thinkLabel,  _channelLabel, color);
}

function btn_lemon ()  {

    let color = "116,100,100";
    
    openHAB_Object.sendCommand (_thinkLabel,  _channelLabel, color);
    openHAB_Object.setState_values (_thinkLabel,  _channelLabel, color);
}

function btn_turkis ()  {
    
    let color = "236,85,95";
   
    openHAB_Object.sendCommand (_thinkLabel,  _channelLabel, color);
    openHAB_Object.setState_values (_thinkLabel,  _channelLabel, color);
}

function btn_lila() {
   
    let color = "308,100,100";
    
    openHAB_Object.sendCommand (_thinkLabel,  _channelLabel, color);
    openHAB_Object.setState_values (_thinkLabel,  _channelLabel, color);
}

function btn_white()  {
   
    let color = "227,29,100";

    openHAB_Object.sendCommand (_thinkLabel,  _channelLabel, color);
    openHAB_Object.setState_values (_thinkLabel,  _channelLabel, color);
}

function btn_sunset ()  {
    
    let color = "15,82,79";
    
    openHAB_Object.sendCommand (_thinkLabel,  _channelLabel, color);
    openHAB_Object.setState_values (_thinkLabel, _channelLabel, color);
}

function SWITCH_ON ()  {
    let on = 'ON';

    openHAB_Object.sendCommand (_thinkLabel,  _channelLabel, on);
    openHAB_Object.setState_values (_thinkLabel,  _channelLabel, on);
}

function SWITCH_OFF ()  {
    let off = 'OFF';

    openHAB_Object.sendCommand (_thinkLabel,  _channelLabel, off);
    openHAB_Object.setState_values (_thinkLabel,  _channelLabel, off);
}