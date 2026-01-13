'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Users,
  UserPlus,
  Mail,
  MoreHorizontal,
  Shield,
  Settings,
  Trash2,
  Crown,
  Eye,
  Edit,
  Copy,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  status: 'active' | 'pending' | 'suspended';
  avatar?: string;
  joinedAt: string;
  lastActive: string;
  projects: number;
}

interface Invitation {
  id: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  status: 'pending' | 'expired';
  sentAt: string;
  expiresAt: string;
}

export function TeamSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'member' | 'viewer'>('member');

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@freelancer.com',
      role: 'owner',
      status: 'active',
      avatar: '',
      joinedAt: 'Jan 2024',
      lastActive: '2 minutes ago',
      projects: 8
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@freelancer.com',
      role: 'admin',
      status: 'active',
      avatar: '',
      joinedAt: 'Feb 2024',
      lastActive: '1 hour ago',
      projects: 5
    },
    {
      id: '3',
      name: 'Lisa Rodriguez',
      email: 'lisa@contractor.com',
      role: 'member',
      status: 'active',
      avatar: '',
      joinedAt: 'Mar 2024',
      lastActive: '1 day ago',
      projects: 3
    }
  ]);

  const [pendingInvitations, setPendingInvitations] = useState<Invitation[]>([
    {
      id: '1',
      email: 'john@designer.com',
      role: 'member',
      status: 'pending',
      sentAt: '2 days ago',
      expiresAt: 'Mar 20, 2024'
    }
  ]);

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newInvitation: Invitation = {
      id: Date.now().toString(),
      email: inviteEmail,
      role: inviteRole,
      status: 'pending',
      sentAt: 'Just now',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };

    setPendingInvitations(prev => [...prev, newInvitation]);
    setInviteEmail('');
    setInviteRole('member');
    setIsLoading(false);
  };

  const handleRemoveMember = (memberId: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const handleUpdateRole = (memberId: string, newRole: TeamMember['role']) => {
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
  };

  const handleResendInvitation = (invitationId: string) => {
    setPendingInvitations(prev =>
      prev.map(invitation =>
        invitation.id === invitationId
          ? { ...invitation, sentAt: 'Just now' }
          : invitation
      )
    );
  };

  const handleCancelInvitation = (invitationId: string) => {
    setPendingInvitations(prev => prev.filter(invitation => invitation.id !== invitationId));
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-4 w-4 text-amber-500" />;
      case 'admin':
        return <Shield className="h-4 w-4 text-blue-500" />;
      case 'member':
        return <Edit className="h-4 w-4 text-green-500" />;
      case 'viewer':
        return <Eye className="h-4 w-4 text-slate-500" />;
      default:
        return null;
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      owner: 'bg-amber-100 text-amber-700',
      admin: 'bg-blue-100 text-blue-700',
      member: 'bg-green-100 text-green-700',
      viewer: 'bg-slate-100 text-slate-700'
    };

    return (
      <Badge className={colors[role as keyof typeof colors] || colors.viewer}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'suspended':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const rolePermissions = {
    owner: ['All permissions', 'Billing management', 'Delete workspace'],
    admin: ['Manage team', 'All project access', 'Settings management'],
    member: ['Create projects', 'Edit assigned projects', 'View reports'],
    viewer: ['View projects', 'View reports', 'Comment on projects']
  };

  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{teamMembers.length}</div>
            <div className="text-sm text-slate-600">Total Members</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {teamMembers.filter(m => m.status === 'active').length}
            </div>
            <div className="text-sm text-slate-600">Active Members</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{pendingInvitations.length}</div>
            <div className="text-sm text-slate-600">Pending Invitations</div>
          </CardContent>
        </Card>
      </div>

      {/* Invite New Member */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Invite Team Member</span>
          </CardTitle>
          <CardDescription>
            Send an invitation to add a new member to your team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInviteMember} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="invite-email">Email Address</Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="colleague@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="invite-role">Role</Label>
                <Select value={inviteRole} onValueChange={(value: 'admin' | 'member' | 'viewer') => setInviteRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !inviteEmail}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Sending...' : 'Send Invitation'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      {pendingInvitations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Invitations</CardTitle>
            <CardDescription>
              Invitations that haven't been accepted yet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingInvitations.map((invitation) => (
                <div key={invitation.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-full">
                      <Mail className="h-4 w-4 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-medium">{invitation.email}</div>
                      <div className="text-sm text-slate-600">
                        Invited {invitation.sentAt} • Expires {invitation.expiresAt}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {getRoleBadge(invitation.role)}

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResendInvitation(invitation.id)}
                      >
                        Resend
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCancelInvitation(invitation.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage your team members and their permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium">{member.name}</h3>
                      {getStatusIcon(member.status)}
                      {member.role === 'owner' && getRoleIcon(member.role)}
                    </div>
                    <p className="text-sm text-slate-600">{member.email}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-500 mt-1">
                      <span>Joined {member.joinedAt}</span>
                      <span>•</span>
                      <span>Last active {member.lastActive}</span>
                      <span>•</span>
                      <span>{member.projects} projects</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {getRoleBadge(member.role)}

                  {member.role !== 'owner' && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Settings className="h-4 w-4 mr-2" />
                          Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="h-4 w-4 mr-2" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Overview of what each role can do in your workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(rolePermissions).map(([role, permissions]) => (
              <div key={role} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  {getRoleIcon(role)}
                  <h3 className="font-medium capitalize">{role}</h3>
                </div>
                <ul className="space-y-1">
                  {permissions.map((permission, index) => (
                    <li key={index} className="text-sm text-slate-600 flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                      <span>{permission}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}