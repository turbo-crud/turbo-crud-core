function SidebarMenuController() {

    this.sidebar;
    this.closeBtn;
    this.searchBtn;
    this.systemApiClient;
    this.uiContext;

    this.setup = async (systemApiClient, uiContext) => {
        this.systemApiClient = systemApiClient;
        this.uiContext = uiContext;
    }

    this.start = async () => {
        var uiSettings = await this.systemApiClient.getUiSettings();
        this.uiContext.setUiSettings(uiSettings);
        appendMenuItems(uiSettings);
    }

    function appendMenuItems(uiSettings) {

        var ul = document.getElementById("menu-container");
        var menuItems = uiSettings.entities;

        for (var item of menuItems) {
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

            linkElement.appendChild(document.createTextNode(" "));

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

        document.dispatchEvent(new CustomEvent("menu-event", {
            'detail': {
                name: event.target.getAttribute("menu-name")
            }
        }));
    }
}