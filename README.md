# BookInTime (TheBIT)

### Instructions for contributing to this repository (from the command line)
Clone the repository by navigating to an appropriate directory and entering:
git clone <link copied from website>

https://stackoverflow.com/questions/21756614/difference-between-git-merge-origin-master-and-git-pull
Pull changes to remote repository made by someone else with:
git pull origin <branch-name>
git pull' == 'git pull origin <current local branch>


Push new changes from your local branch to the remote branch it is tracking via:
git add --all .
git commit -m "some message"
git push

List local branches:
git branch -v

List local and remote branches:
git branch -va

Switch branch you're currently working on on local machine:
git checkout <branch-name>

Create and switch to new branch on local machine:
git checkout -b <branch-name>

In the event there's a remote branch you're not tracking locally (someone starts working on a new feature):
https://stackoverflow.com/questions/11262703/track-a-new-remote-branch-created-on-github
git fetch
git branch --track branch-name origin/branch-name


Merging two branches together (more on this later):
Hop to the branch you want to merge into (bring changes to/update)
git merge <other-branch-name>

If that causes issues, consider using:
<<<<<<< HEAD
git mergetool
=======
git mergetool
>>>>>>> authentication_module
