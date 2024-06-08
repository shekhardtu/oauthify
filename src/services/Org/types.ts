export interface IgetUsers {}

export interface IapplyJob {}
export interface Ijob {
  profile: {
    type: String;
    trim: true;
  };
  workLocation: {
    type: String;
    trim: true;
    default: "Delhi";
  };
  opportunityType: {
    type: String;
    trim: true;
    enum: ["INTERNSHIP", "JOB"];
    sparse: true;
    default: "JOB";
  };
  jobCommitment: {
    type: String;
    trim: true;
    enum: ["FULLTIME", "PARTTIME"];
    sparse: true;
    default: "FULLTIME";
  };
  isRemote: {
    type: String;
    trim: true;
    enum: [true, false];
    sparse: true;
    default: false;
  };
  roleAndResponsibility: {
    type: String;
    trim: true;
  };
  eligibilityCriteria: {
    type: String;
    trim: true;
  };
  status: {
    type: String;
    enum: ["PUBLISHED", "DRAFT", "UNPUBLISHED"];
    default: "UNPUBLISHED";
  };
  createdById: {
    type: String;
    trim: true;
  };
  isBlocked: {
    type: Boolean;
    default: false;
  };
}

export interface IputJobApplication {
  id?: string;
}
