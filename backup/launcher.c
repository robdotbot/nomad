// Tiny launcher so macOS privacy (TCC) has one signed app to grant Full Disk Access to.
// launchd runs this; it runs nomad-backup.sh, which inherits the app's access.
// build-app.sh compiles in the script's absolute path as NOMAD_BACKUP_SCRIPT.
#include <unistd.h>
#include <stdio.h>
#ifndef NOMAD_BACKUP_SCRIPT
#error "build with -DNOMAD_BACKUP_SCRIPT=\"/path/to/nomad-backup.sh\""
#endif
int main(void) {
  execl("/bin/zsh", "zsh", NOMAD_BACKUP_SCRIPT, (char *)NULL);
  perror("exec nomad-backup.sh");
  return 1;
}
