/* 

    JavaScript Library for OpenHAB Object.

    Use of the FETCH API => Interface for fetching resources, like using  XMLHttpRequest but more powerfull and has flexible feature set.

    List of exported functions:

        1) getAllThings:            Retrieve all Things from the OpenHAB-runtime (Server).
        2) getOneSpecificThing:     Retrieve a specific Thing by his UID from the OpenHAB-runtime (Server).
        3) getState_value:          Get the current State- values of an Item.
        4) setState_values:         Send new values for the state to the openHAB- runtime (Server).
        5) sendCommand:             Post (POST. Request) state new values for the Item on the openHAB- runtime (Server).
                                    
        

    List of internal functions:
    
        1) provideLinkedItem:       Linked Item is composed of: Item-Label and Channel-Label.(e.g: RemActLight_Farbe). 
                                    so it can match with the corresponding string-part on the Item-name (used as URL parameter).

        2) displayAllThings:        Outputs the Array of available Things on the this included test-UI (not for other UI)
        3) displayOneThing:         Outputs the Thing Object on the this included test-UI (not for other UI)
        4) displayStateValue        Outputs the current state Value on the this included test-UI (not for other UI)


    Author: Eli Kabasele Kabasele, ek058@hdm-stuttgart.de  
    
    *************************************************************************************************

    /**
        Variables global for the OpenHAB-Object
     */

    const openHAB_IP = 'localhost'; //should be replaced with the IP Address of the actuel OpenHAB
    
    const PORT = '8080';

    const BASE_URL = 'http://' + openHAB_IP + ':'+ PORT + '/rest';
     
    let thing_UID = '',
        thing_label = '',
        currentState = '',
        channel_ID = '',
        availble_Channels = [],
        allThings = [],
        thing_object = {},
        thing_status = ''
 
               
     
//***************************************************************************************************        

/**
   Definition of the Namespace:  OpenHAB-Object
*/

let openHAB_Object = {
     
    
    /*********************************************************************
     1) getAllThings: Retrieve all Things from the OpenHAB-runtime (Server).
        Return: Array with All Things available in the System and contain following properties:
            thing_label: Name or Label for Thing
            thing_UID: UID of the Thing
            thing_status: Status of the Thing
    */
   getAllThings: function () {
   
       fetch (BASE_URL + '/things')
          .then ( (res) => res.json() )
          .then ( (data) => {
             
              data.forEach(thing => {

                  thing_UID = thing.UID;
                  thing_label = thing.label;
                  thing_status = thing.statusInfo.status;

                  allThings.push ( {
                      'Thing_name': thing_label,
                      'Thing_UID': thing_UID,
                      'Thing_status': thing_status
                  });

                  /**
                    internal function: display allThings- Array on this UI (adjustPage.html)
                    => DO NOT USE with other UI!   
                   */
                  openHAB_Object.displayAllThings (allThings);            
              });

          })
          .catch ( (err) => console.log (err))

          console.log (allThings);
          return allThings;
   },

  

    /*********************************************************************************
     2) getOneSpecificThing:  Retrieve a specific Thing by his UID from the OpenHAB-runtime (Server).
        Return: A thing Object by his UID and contains following properties:
            thing_label: Name or Label for Thing
            thing_available_Channels: Array of All Channels availble for the Thing
            think_link : Link (URL) of the Thing

    */
    getOneSpecificThing: function (thing_UID) {

       //local Variables (to this function)
       let channel_description = '';
       let linkedItem = '';
       let thing_link = '';
       let channel_label = '';


       fetch (BASE_URL + '/things/' + thing_UID)
           .then ( (res) => res.json() )
           .then ( (data) => {
            
               thing_label = data.label;
               thing_link = BASE_URL + '/things/' + thing_UID
               data.channels.forEach (channel => {

                   channel_label = channel.label;
                   channel_ID = channel.id;
                   linkedItem = channel.linkedItems;
                   channel_description = channel.description;

                   availble_Channels.push ( {
                       'Channel_name': channel_label,
                       'Linked_Items': linkedItem,
                       'Channel_ID': channel_ID,
                       'Channel_description': channel_description
                   })
                
               })

               thing_object = {
                   'Thing_name': thing_label,
                   'Thing_link': thing_link,
                   'Available_channels': availble_Channels
               }
               
               console.log (thing_object);  


                /**
                    internal function: display a Thing- Object on this UI (adjustPage.html)
                    => DO NOT USE with other UI!   
                */
               openHAB_Object.displayOneThing (thing_object, thing_UID)
           })
           .catch ( (err) => console.log (err));       
      
           return thing_object;      
   },

  


    /**********************************************************************************  
    3) getCurrentState:  Get the current State- values of an Item.
        Return: A String => current State- value for the Item 
            
    */
    getState_value: function (thing_label, channel_label) {

        let url_param = openHAB_Object.provideLinkedItem (thing_label, channel_label); 

        let item_URL = BASE_URL + '/items/' + url_param + '/state';

        fetch (item_URL)
            .then ( (res) => res.text())
            .then ( (data) => {
                currentState = data;
                
                /**
                    internal function: display the state value on this UI (adjustPage.html)
                    => DO NOT USE with other UI!   
                */
                openHAB_Object.displayStateValue (currentState);
            })

            return currentState; 
   },



    /************************************************************************************
     4) setState_values:  update (PUT- Request) state new values for the Item on the openHAB- runtime (Server).
        display the Response status and statusText
    */
    setState_values: function (thing_label, channel_label, stateValue) {

        let url_param = openHAB_Object.provideLinkedItem (thing_label, channel_label); 

        let item_URL = BASE_URL + '/items/' + url_param + '/state';

      
       fetch (item_URL, {

           method: 'PUT',
           headers: {
               'Accept': 'application/json',
               'content-type': 'text/plain'
           },
           body: stateValue 
       })
        
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Request-status and Status-text: ', response.status + ', ' + response.statusText));

   },



    /*********************************************************************************
     5) sendCommand:  post (POST. Request) state new values for the Item on the openHAB- runtime (Server).
        display the Response status and statusText
    */   
    sendCommand: function (thing_label, channel_label, commandValue) {

        let url_param = openHAB_Object.provideLinkedItem (thing_label, channel_label); 

        let item_URL = BASE_URL + '/items/' + url_param ;

        fetch (item_URL, {

        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'content-type': 'text/plain'
        },
        body: commandValue
        })
        
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Request-status and Status-text: ', response.status + ', ' + response.statusText));

},




/* -------------------------------  INTERNAL FUNCTIONS below  ----------------------------------- */

   /***********************************************************************
     The method returns a string, the linkedItem composed of Thing-Label (e.g RemActLight) 
     and Channel-Label (e.g Farbe) => linkedItem = RemActLight_Farbe
    */
   provideLinkedItem: function (thingLabel, channelLabel) {
         
        var res = thingLabel + '_' + channelLabel;
       
        console.log ("LinkedItem: " + res);
        return res ;
    },


    /***********************************************************************
     internal function: display allThings- Array on this UI (adjustPage.html)
                    => to be replaced when other UI is used
    */
    displayAllThings (allThings) {

        let outputAll = '<h3> Available Things: </h3>';
        for (let i = 0; i< allThings.length; i++) {

            _name = allThings[i].Thing_name
            _uid = allThings[i].Thing_UID
            _status = allThings[i].Thing_status

            outputAll +=
            ` <ul>
                <li> <b>---- Thing ${i+1} </b> </li>
                <li> <b> Thing- Name </b>: ${_name} </li>
                <li> <b>Thing- UID </b>: ${_uid} </li> 
                <li> <b>Thing- Status </b>: ${_status} </li>              
              </ul>    
            `
        }        
        document.getElementById ('outputAll').innerHTML = outputAll;
    },




    /***********************************************************************
     internal function: display a Thing- Object on this UI (adjustPage.html)
                    => to be replaced when other UI is used   
    */
    displayOneThing (thing_object, thing_UID) {

        let outputAll = '<h3> Thing: </h3>';
        
            _name = thing_object.Thing_name
            _channels = thing_object.Available_channels

            let outputChnl = '<h5> Available Channels: </h5>';
            for (let i = 0; i< _channels.length; i++) {
                _channel_name = _channels[i].Channel_name
                _channel_ID = _channels[i].Channel_ID
                _channel_linkedItem = _channels[i].Linked_Items
                _channel_descrition = _channels[i].Channel_description 


               outputChnl += `
                
                                <ul>
                                <li> <b>---- Channel ${i+1} </b> </li>
                                    <li> <b> Channel- Name </b>:  ${_channel_name}</li>
                                    <li> <b> Channel- ID </b>:  ${_channel_ID}</li>
                                    <li> <b> LinkedItem </b>:  ${_channel_linkedItem}</li>  
                                    <li> <b> Description </b>:  ${_channel_descrition}</li>              
                                </ul>  

                             `           
            }

            outputAll +=
            ` <ul>
                <li> <b> Thing- Name </b>: ${_name} </li>
                <li>  <div id= 'outputChnl'> </div>  </li> 
                           
              </ul>    
            `       
        document.getElementById ('outputAll').innerHTML = outputAll;
        document.getElementById ('outputChnl').innerHTML = outputChnl;
    },

    


    /***********************************************************************
     internal function: display the current state value on this UI (adjustPage.html)
                    => to be replaced when other UI is used   
    */
    displayStateValue (currentState) {

        let outputAll = '<h3> State value: </h3>';

        outputAll +=
                ` <ul>
                    <li> <b> Current state value </b>: ${currentState} </li>           
                </ul>    
                `
        document.getElementById ('outputAll').innerHTML = outputAll;
    }


}


          