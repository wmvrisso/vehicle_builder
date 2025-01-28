// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";
// define the Cli class
class Cli {
    constructor(vehicles) {
        this.exit = false;
        this.vehicles = vehicles;
    }
    // static method to generate a vin
    static generateVin() {
        // return a random string
        return (Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15));
    }
    // method to choose a vehicle from existing vehicles
    chooseVehicle() {
        inquirer
            .prompt([
            {
                type: 'list',
                name: 'selectedVehicleVin',
                message: 'Select a vehicle to perform an action on',
                choices: this.vehicles.map((vehicle) => ({
                    name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
                    value: vehicle.vin,
                })),
            },
        ])
            .then((answers) => {
            // set the selectedVehicleVin to the vin of the selected vehicle
            this.selectedVehicleVin = answers.selectedVehicleVin;
            // perform actions on the selected vehicle
            this.performActions();
        });
    }
    // method to create a vehicle
    createVehicle() {
        inquirer
            .prompt([
            {
                type: 'list',
                name: 'vehicleType',
                message: 'Select a vehicle type',
                choices: ['Car', 'Truck', 'Motorbike'],
            },
        ])
            .then((answers) => {
            if (answers.vehicleType === 'Car') {
                // create a car
                this.createCar();
            }
            else if (answers.vehicleType === 'Truck') {
                // create a truck
                this.createTruck();
            }
            else if (answers.vehicleType === 'Motorbike') {
                // create a motorbike
                this.createMotorbike();
            }
        });
    }
    // helper method to find a vehicle by VIN
    findVehicleByVin(vin) {
        return this.vehicles.find((vehicle) => vehicle.vin === vin);
    }
    // method to create a car
    createCar() {
        inquirer
            .prompt([
            {
                type: 'input',
                name: 'color',
                message: 'Enter Color',
            },
            {
                type: 'input',
                name: 'make',
                message: 'Enter Make',
            },
            {
                type: 'input',
                name: 'model',
                message: 'Enter Model',
            },
            {
                type: 'input',
                name: 'year',
                message: 'Enter Year',
            },
            {
                type: 'input',
                name: 'weight',
                message: 'Enter Weight',
            },
            {
                type: 'input',
                name: 'topSpeed',
                message: 'Enter Top Speed',
            },
        ])
            .then((answers) => {
            const car = new Car(
            // TODO: The generateVin method is static and should be called using the class name Cli, make sure to use Cli.generateVin() for creating a truck and motorbike as well!
            Cli.generateVin(), answers.color, answers.make, answers.model, parseInt(answers.year), parseInt(answers.weight), parseInt(answers.topSpeed), []);
            // push the car to the vehicles array
            this.vehicles.push(car);
            // set the selectedVehicleVin to the vin of the car
            this.selectedVehicleVin = car.vin;
            // perform actions on the car
            this.performActions();
        });
    }
    // method to create a truck
    createTruck() {
        inquirer
            .prompt([
            {
                type: 'input',
                name: 'color',
                message: 'Enter Color',
            },
            {
                type: 'input',
                name: 'make',
                message: 'Enter Make',
            },
            {
                type: 'input',
                name: 'model',
                message: 'Enter Model',
            },
            {
                type: 'input',
                name: 'year',
                message: 'Enter Year',
            },
            {
                type: 'input',
                name: 'weight',
                message: 'Enter Weight',
            },
            {
                type: 'input',
                name: 'topSpeed',
                message: 'Enter Top Speed',
            },
            {
                type: 'input',
                name: 'towingCapacity',
                message: 'Enter Towing Capacity',
            },
        ])
            .then((answers) => {
            const truck = new Truck(
            // TODO: Use the answers object to pass the required properties to the Truck constructor
            Cli.generateVin(), answers.color, answers.make, answers.model, parseInt(answers.year), parseInt(answers.weight), parseInt(answers.topSpeed), parseInt(answers.towingCapacity));
            // TODO: push the truck to the vehicles array
            this.vehicles.push(truck);
            // TODO: set the selectedVehicleVin to the vin of the truck
            this.selectedVehicleVin = truck.vin;
            // TODO: perform actions on the truck
            this.performActions();
        });
    }
    // method to create a motorbike
    createMotorbike() {
        inquirer
            .prompt([
            {
                type: 'input',
                name: 'color',
                message: 'Enter Color',
            },
            {
                type: 'input',
                name: 'make',
                message: 'Enter Make',
            },
            {
                type: 'input',
                name: 'model',
                message: 'Enter Model',
            },
            {
                type: 'input',
                name: 'year',
                message: 'Enter Year',
            },
            {
                type: 'input',
                name: 'weight',
                message: 'Enter Weight',
            },
            {
                type: 'input',
                name: 'topSpeed',
                message: 'Enter Top Speed',
            },
            {
                type: 'input',
                name: 'frontWheelDiameter',
                message: 'Enter Front Wheel Diameter',
            },
            {
                type: 'input',
                name: 'frontWheelBrand',
                message: 'Enter Front Wheel Brand',
            },
            {
                type: 'input',
                name: 'rearWheelDiameter',
                message: 'Enter Rear Wheel Diameter',
            },
            {
                type: 'input',
                name: 'rearWheelBrand',
                message: 'Enter Rear Wheel Brand',
            },
        ])
            .then((answers) => {
            const motorbike = new Motorbike(
            // TODO: Use the answers object to pass the required properties to the Motorbike constructor
            Cli.generateVin(), answers.color, answers.make, answers.model, parseInt(answers.year), parseInt(answers.weight), parseInt(answers.topSpeed), [new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand),
                new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand)]);
            // TODO: push the motorbike to the vehicles array
            this.vehicles.push(motorbike);
            // TODO: set the selectedVehicleVin to the vin of the motorbike
            this.selectedVehicleVin = motorbike.vin;
            // TODO: perform actions on the motorbike
            this.performActions();
        });
    }
    // method to find a vehicle to tow
    // TODO: add a parameter to accept a truck object
    findVehicleToTow(truck) {
        inquirer
            .prompt([
            {
                type: 'list',
                name: 'vehicleToTow',
                message: 'Select a vehicle to tow',
                choices: this.vehicles.filter(vehicle => vehicle.vin !== truck.vin).map(vehicle => ({
                    name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
                    value: vehicle.vin,
                })),
            },
        ])
            .then((answers) => {
            const vehicleToTow = this.findVehicleByVin(answers.vehicleToTow);
            if (!vehicleToTow) {
                console.log('Selected vehicle not found');
                this.performActions();
                return;
            }
            // Tow the selected vehicle
            console.log(`Towing vehicle ${vehicleToTow.make} ${vehicleToTow.model} (${vehicleToTow.vin})`);
            truck.tow(vehicleToTow);
            // Allow the user to select another action
            this.performActions();
        });
    }
    // method to perform actions on a vehicle
    performActions() {
        const selectedVehicle = this.findVehicleByVin(this.selectedVehicleVin);
        if (!selectedVehicle) {
            console.error("Selected vehicle not found.");
            return;
        }
        inquirer
            .prompt([
            {
                type: "list",
                name: "action",
                message: "Select an action to perform:",
                choices: [
                    "Print details",
                    "Start vehicle",
                    "Accelerate 5 MPH",
                    "Decelerate 5 MPH",
                    "Stop vehicle",
                    "Turn right",
                    "Turn left",
                    "Reverse",
                    "Select or create another vehicle",
                    "Exit",
                ],
            },
        ])
            .then((answers) => {
            switch (answers.action) {
                case "Print details":
                    selectedVehicle.printDetails();
                    break;
                case "Start vehicle":
                    selectedVehicle.start();
                    break;
                case "Accelerate 5 MPH":
                    selectedVehicle.accelerate(5);
                    break;
                case "Decelerate 5 MPH":
                    selectedVehicle.decelerate(5);
                    break;
                case "Stop vehicle":
                    selectedVehicle.stop();
                    break;
                case "Turn right":
                    selectedVehicle.turn("right");
                    break;
                case "Turn left":
                    selectedVehicle.turn("left");
                    break;
                case "Reverse":
                    selectedVehicle.reverse();
                    break;
                case "Select or create another vehicle":
                    this.startCli();
                    return;
                case "Exit":
                    this.exit = true;
                    break;
            }
            if (!this.exit) {
                this.performActions();
            }
        });
    }
    // method to start the CLI
    startCli() {
        inquirer
            .prompt([
            {
                type: "list",
                name: "createOrSelect",
                message: "Would you like to create a new vehicle or select an existing one?",
                choices: ["Create a new vehicle", "Select an existing vehicle"],
            },
        ])
            .then((answers) => {
            if (answers.createOrSelect === "Create a new vehicle") {
                this.createVehicle();
            }
            else {
                this.chooseVehicle();
            }
        });
    }
}
// export the Cli class
export default Cli;
