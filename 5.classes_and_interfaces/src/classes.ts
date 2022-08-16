abstract class Department {
    static fiscalYear = 2022
    //private name: string;
    protected employees: string[] = [];

    constructor(protected readonly id: string, public name: string) {
        //this.name = n;
    }

    static createEmployee(name: string) {
        return { name: name };
    }

    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);


    }
}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, 'IT');
    }

    describe() {
        console.log(`IT Department - ID: ${this.id}`);

    }
}

class Accounting extends Department {
    private lastReport: string;
    private static instance: Accounting;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value!');
        }
        this.addReport(value);
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new Accounting('d3', []);
        return this.instance;
    }

    describe() {
        console.log(`Accounting Department - ID: ${this.id}`);
    }

    addEmployee(name: string) {
        if (name === 'Mike') {
            return;
        }
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }
}

const employee1 = Department.createEmployee('Michael');
console.log(employee1, Department.fiscalYear);

// const accounting = new Department('d1', 'Accounting');
// accounting.addEmployee('Mike');
// accounting.addEmployee('Bruno');

// accounting.describe();
// accounting.printEmployeeInformation();

// const accountingCopy = { name: 'Testing', describe: accounting.describe };
// accountingCopy.describe();

const it = new ITDepartment('d2', ['Mike']);
it.describe();

//const accountingD = new Accounting('d3', []);
const accountingD = Accounting.getInstance();

//console.log(accountingD.mostRecentReport);
//accountingD.mostRecentReport=''
accountingD.addReport('Q1 Sales Report');
//console.log(accountingD.mostRecentReport);

accountingD.describe();
accountingD.printReports();

accountingD.addEmployee('Mike');
accountingD.addEmployee('Bruno');

//accountingD.printEmployeeInformation();
accountingD.describe();