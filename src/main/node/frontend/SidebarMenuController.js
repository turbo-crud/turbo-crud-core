function SidebarMenuController(){

    this.sidebar;
    this.closeBtn;
    this.searchBtn;
    
    this.start = async (systemApiClient) => {

        var menuItems = await systemApiClient.getMenuSimpleList();

        appendMenuItems(menuItems);     
    }

    function appendMenuItems(items){

        var ul = document.getElementById("menu-container");
        
        for(var item of items){
            let liElement = document.createElement('li')
            
            let linkElement = document.createElement('a')
            linkElement.setAttribute('href', "#")
            linkElement.setAttribute('menu-name', item.name)
            linkElement.setAttribute('class', "sidebar-link")

            let span1 = document.createElement('span');
            span1.setAttribute('class', "icon-holder")
            span1.setAttribute('menu-name', item.name)
            linkElement.appendChild(span1);  
            

            let iElement = document.createElement('i')
            iElement.setAttribute('class', `c-blue-500 ${item.icon}`)
            iElement.setAttribute('menu-name', item.name)
            span1.appendChild(iElement);      
            
            linkElement.appendChild(document.createTextNode (" ")); 
            
            let span2 = document.createElement('span');
            span2.textContent = item.label;
            span2.setAttribute('class', "title")
            span2.setAttribute('menu-name', item.name)
            span2.textContent = item.label;
            linkElement.appendChild(span2); 
            
            liElement.appendChild(linkElement);
            liElement.addEventListener("click", onMenuClick);
            liElement.setAttribute('menu-name', item.name)
            liElement.setAttribute('class', "nav-item")


            ul.appendChild(liElement);
        }
    }

    onMenuClick = (event) => {
        console.log(event)
        
        document.dispatchEvent(new CustomEvent("menu-event", {
            'detail': {
              name: event.target.getAttribute("menu-name")
            }
          }));        
    }
}