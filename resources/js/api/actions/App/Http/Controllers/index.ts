import CategoryController from './CategoryController'
import TicketController from './TicketController'
import Admin from './Admin'
import AssetController from './AssetController'
import LocationController from './LocationController'
import MaintenanceController from './MaintenanceController'
import HelpdeskController from './HelpdeskController'
import Settings from './Settings'
const Controllers = {
    CategoryController: Object.assign(CategoryController, CategoryController),
TicketController: Object.assign(TicketController, TicketController),
Admin: Object.assign(Admin, Admin),
AssetController: Object.assign(AssetController, AssetController),
LocationController: Object.assign(LocationController, LocationController),
MaintenanceController: Object.assign(MaintenanceController, MaintenanceController),
HelpdeskController: Object.assign(HelpdeskController, HelpdeskController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers